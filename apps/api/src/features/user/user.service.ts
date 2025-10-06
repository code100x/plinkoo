import type { Bet, Prisma, ProvablyFairState, User } from '@prisma/client';
import db from '@repo/db';
import type { ProvablyFairStateResponse } from '@repo/common/types';
import {
  getGeneratedFloats,
  getHashedSeed,
  getHmacSeed,
} from '@repo/common/game-utils/provably-fair/utils.js';
import { BadRequestError } from '../../errors';
import { generateClientSeed, generateServerSeed } from './user.utils';

export class UserInstance {
  constructor(
    private user: User,
    private provablyFairState: ProvablyFairState
  ) {}

  setBalance(amount: string) {
    // Ensure the balance is stored as a string
    this.user.balance = amount;
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this.user.id;
  }

  async rotateSeed(clientSeed: string): Promise<ProvablyFairStateResponse> {
    const newServerSeed = this.generateNextServerSeed();
    const hashedServerSeed = getHashedSeed(newServerSeed);

    const result = await db.$transaction(async tx => {
      // Mark current seed as revealed
      await tx.provablyFairState.update({
        where: { id: this.provablyFairState.id },
        data: { revealed: true },
      });

      // Create new seeds
      const updated = await tx.provablyFairState.create({
        data: {
          serverSeed: newServerSeed,
          hashedServerSeed,
          clientSeed,
          revealed: false,
          nonce: 0,
          userId: this.user.id,
        },
      });

      // Update instance state
      this.provablyFairState = updated;

      return {
        clientSeed,
        hashedServerSeed: this.getHashedServerSeed(),
        hashedNextServerSeed: this.getHashedNextServerSeed(),
        nonce: updated.nonce,
      };
    });

    return result;
  }

  getBalance(): string {
    return this.user.balance;
  }

  // Convert balance to number for calculations when needed
  getBalanceAsNumber(): number {
    return parseInt(this.user.balance, 10);
  }

  async updateNonce(tx: Prisma.TransactionClient) {
    await tx.provablyFairState.update({
      where: { id: this.provablyFairState.id },
      data: { nonce: this.provablyFairState.nonce },
    });
  }

  getProvablyFairStateId() {
    return this.provablyFairState.id;
  }

  getServerSeed() {
    return this.provablyFairState.serverSeed;
  }

  getClientSeed() {
    return this.provablyFairState.clientSeed;
  }

  getNonce() {
    return this.provablyFairState.nonce;
  }

  getHashedServerSeed() {
    return getHashedSeed(this.provablyFairState.serverSeed);
  }

  getHashedNextServerSeed(): string {
    const nextServerSeed = this.generateNextServerSeed();
    return getHashedSeed(nextServerSeed);
  }

  private generateNextServerSeed(): string {
    return getHmacSeed(this.provablyFairState.serverSeed, 'next-seed');
  }

  generateFloats(count: number): number[] {
    this.provablyFairState.nonce += 1;
    return getGeneratedFloats({
      count,
      seed: this.provablyFairState.serverSeed,
      message: `${this.provablyFairState.clientSeed}:${this.provablyFairState.nonce}`,
    });
  }

  // Function to get a revealed server seed by its hash
  async getRevealedServerSeedByHash(
    hashedServerSeed: string
  ): Promise<string | null> {
    const revealedState = await db.provablyFairState.findFirst({
      where: {
        hashedServerSeed,
        revealed: true,
        userId: this.user.id,
      },
    });

    if (!revealedState) {
      return null;
    }

    return revealedState.serverSeed;
  }
}

class UserManager {
  private static instance: UserManager | undefined;
  private users = new Map<string, UserInstance>();

  static getInstance() {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  async getUser(userId: string): Promise<UserInstance> {
    if (!this.users.has(userId)) {
      const user = await db.user.findUnique({
        where: { id: userId },
        include: {
          provablyFairStates: {
            where: {
              revealed: false,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      });
      if (!user) {
        throw new BadRequestError('User not found');
      }
      if (!user.provablyFairStates[0]) {
        const serverSeed = generateServerSeed();
        const clientSeed = generateClientSeed();
        const hashedServerSeed = getHashedSeed(serverSeed);
        // Create initial provably fair state if it doesn't exist
        const provablyFairState = await db.provablyFairState.create({
          data: {
            userId: user.id,
            serverSeed,
            clientSeed,
            hashedServerSeed,
            nonce: 0,
            revealed: false,
          },
        });
        user.provablyFairStates = [provablyFairState];
      }
      this.users.set(
        userId,
        new UserInstance(user, user.provablyFairStates[0])
      );
    }
    const user = this.users.get(userId);
    if (!user) {
      throw new BadRequestError('User not found in manager');
    }
    return user;
  }

  async getActiveBets(userId: string): Promise<Bet[]> {
    const bets = await db.bet.findMany({
      where: { userId, active: true },
    });
    return bets;
  }

  removeUser(userId: string) {
    this.users.delete(userId);
  }
}

export const userManager = UserManager.getInstance();

export const getUserBets = async ({
  userId,
  page = 1,
  pageSize = 10,
}: {
  userId: string;
  page?: number;
  pageSize?: number;
}) => {
  // Ensure valid pagination parameters
  const validPage = Math.max(1, page);
  const validPageSize = Math.min(100, Math.max(1, pageSize));

  // Get total count for pagination
  const totalCount = await db.bet.count({
    where: {
      userId,
    },
  });

  // Get paginated bets
  const bets = await db.bet.findMany({
    where: {
      userId,
      active: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip: (validPage - 1) * validPageSize,
    take: validPageSize,
  });

  // Calculate pagination metadata
  const totalPages = Math.ceil(totalCount / validPageSize);
  const hasNextPage = validPage < totalPages;
  const hasPreviousPage = validPage > 1;

  return {
    bets: bets.map(bet => ({
      // Format betId as a 12-digit string with leading zeros
      betId: bet.betId.toString().padStart(12, '0'),
      game: bet.game,
      date: bet.createdAt,
      betAmount: bet.betAmount / 100,
      payoutMultiplier: bet.payoutAmount / bet.betAmount,
      payout: bet.payoutAmount / 100,
      id: bet.id,
    })),
    pagination: {
      page: validPage,
      pageSize: validPageSize,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };
};
