import type { User, Game, Bet, PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import db, { PrismaTransactionalClient } from '@repo/db';
import { BadRequestError } from '../errors';
import { userManager, UserInstance } from '../features/user/user.service';

export interface BetValidationOptions {
  betAmount: number;
  userInstance: UserInstance;
}

export interface UpdateBetTransactionOptions {
  betId: string;
  data: any;
}

export interface BetTransactionOptions {
  active?: boolean;
  betAmount: number;
  game: Game;
  gameState: any;
  payoutAmount?: number;
  userInstance: UserInstance;
}

export interface BetTransactionResult {
  bet: Bet;
  betId: string;
  newBalance: string;
}

/**
 * Validates bet amount and user balance
 */
export const validateBetAmount = async ({
  betAmount,
  userInstance,
}: BetValidationOptions): Promise<{
  betAmountInCents: number;
  userBalanceInCents: number;
}> => {
  // Validate bet amount range
  if (betAmount <= 0) {
    throw new BadRequestError('Bet amount must be greater than 0');
  }

  // Convert to cents for precision
  const betAmountInCents = Math.round(betAmount * 100);
  const userBalanceInCents = userInstance.getBalanceAsNumber();

  // Check sufficient balance
  if (userBalanceInCents < betAmountInCents) {
    throw new BadRequestError('Insufficient balance');
  }

  return {
    betAmountInCents,
    userBalanceInCents,
  };
};

const updateBalance = async ({
  betAmount,
  payoutAmount,
  tx,
  userInstance,
}: {
  betAmount: number;
  payoutAmount: number;
  tx: PrismaTransactionalClient;
  userInstance: UserInstance;
}): Promise<string> => {
  const userBalance = userInstance.getBalanceAsNumber();
  const balanceChange = payoutAmount - betAmount;
  const newBalance = (userBalance + balanceChange).toString();

  if (balanceChange === 0) {
    return userBalance.toString();
  }

  const userWithNewBalance = await tx.user.update({
    where: { id: userInstance.getUserId() },
    data: {
      balance: newBalance,
    },
  });

  return userWithNewBalance.balance;
};

/**
 * Creates a bet transaction and updates user balance
 */
export const createBetTransaction = async ({
  active = false,
  betAmount,
  game,
  gameState,
  payoutAmount = 0,
  userInstance,
}: BetTransactionOptions): Promise<BetTransactionResult> => {
  const { balance, bet } = await db.$transaction(async tx => {
    // Create bet record
    const bet = await tx.bet.create({
      data: {
        active,
        betAmount,
        betNonce: userInstance.getNonce(),
        game,
        payoutAmount,
        provablyFairStateId: userInstance.getProvablyFairStateId(),
        state: gameState,
        userId: userInstance.getUserId(),
      },
    });

    // Update user nonce
    await userInstance.updateNonce(tx);

    // Update user balance
    const balance = await updateBalance({
      tx,
      userInstance,
      payoutAmount,
      betAmount,
    });

    return {
      balance,
      bet,
    };
  });

  // Update user instance with new balance
  userInstance.setBalance(balance);

  return {
    betId: bet.id,
    bet,
    newBalance: balance,
  };
};

export const editBetAndUpdateBalance = async ({
  betAmount,
  betId,
  data,
  payoutAmount = 0,
  userInstance,
}: UpdateBetTransactionOptions &
  Omit<BetTransactionOptions, 'active' | 'game' | 'gameState'>) => {
  const { balance, bet } = await db.$transaction(async tx => {
    // Create bet record
    const bet = await tx.bet.update({
      where: { id: betId },
      data,
    });

    // Update user nonce
    await userInstance.updateNonce(tx);

    // Update user balance
    const balance = await updateBalance({
      betAmount,
      payoutAmount,
      tx,
      userInstance,
    });

    return {
      balance,
      bet,
    };
  });

  // Update user instance with new balance
  userInstance.setBalance(balance);

  return {
    bet,
    betId: bet.id,
    newBalance: balance,
  };
};

/**
 * Validates and creates a complete bet transaction
 */
export const validateAndCreateBet = async ({
  active = false,
  betAmount,
  game,
  gameState,
  payoutAmount = 0,
  userInstance,
}: BetValidationOptions &
  Omit<
    BetTransactionOptions,
    'betAmount' | 'userId'
  >): Promise<BetTransactionResult> => {
  // Validate bet
  await validateBetAmount({ betAmount, userInstance });

  // Create transaction
  return createBetTransaction({
    active,
    betAmount,
    game,
    gameState,
    payoutAmount,
    userInstance,
  });
};

/**
 * Converts a major currency unit (e.g., dollars, euros) to its minor unit (e.g., cents, pence).
 * Use for currency-agnostic calculations.
 */
export const amountToMinor = (amount: number): number => {
  return Math.round(amount * 100);
};

/**
 * Converts a minor currency unit (e.g., cents, pence) to its major unit (e.g., dollars, euros).
 * Use for currency-agnostic calculations.
 */
export const minorToAmount = (minor: number): number => {
  return minor / 100;
};

/**
 * Calculates payout multiplier
 */
export const calculatePayoutMultiplier = (
  payoutInCents: number,
  betAmountInCents: number
): number => {
  if (betAmountInCents === 0) return 0;
  return payoutInCents / betAmountInCents;
};
