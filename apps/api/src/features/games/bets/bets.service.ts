import { BetData, PaginatedBetData } from '@repo/common/types';
import db from '@repo/db';
import { NotFoundError } from '../../../errors';

export const getTopBets = async () => {
  // Get paginated bets
  const bets = await db.bet.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: { active: false },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 10,
  });

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
      user: {
        id: bet.user.id,
        name: bet.user.name,
      },
    })),
  };
};

export const getBetById = async (
  betId: string,
  isMyBet: boolean = false
): Promise<BetData | null> => {
  const bet = await db.bet.findUnique({
    where: {
      betId: Number(betId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      provablyFairState: {
        select: {
          serverSeed: true,
          clientSeed: true,
          nonce: true,
          hashedServerSeed: true,
          revealed: true,
        },
      },
    },
  });

  if (!bet) {
    throw new NotFoundError(`Bet with id ${betId} not found`);
  }

  const { serverSeed, revealed, ...rest } = bet.provablyFairState;

  return {
    betId: bet.betId.toString().padStart(12, '0'),
    betNonce: bet.betNonce,
    game: bet.game,
    date: bet.createdAt,
    gameState: bet.state,
    betAmount: bet.betAmount / 100,
    payoutMultiplier: bet.payoutAmount / bet.betAmount,
    payout: bet.payoutAmount / 100,
    id: bet.id,
    provablyFairState: {
      ...rest,
      ...(revealed ? { serverSeed } : {}),
    },
    user: {
      id: bet.user.id,
      name: bet.user.name,
    },
    isMyBet,
  };
};
