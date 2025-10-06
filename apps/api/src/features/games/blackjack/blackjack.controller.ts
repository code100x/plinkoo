import type { User } from '@prisma/client';
import { ApiResponse } from '@repo/common/types';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BlackjackBetSchema,
  BlackjackPlayRoundSchema,
} from '@repo/common/game-utils/blackjack/validations.js';
import type {
  BlackjackActions,
  BlackjackPlayRoundResponse,
} from '@repo/common/game-utils/blackjack/types.js';
import db from '@repo/db';
import { userManager } from '../../user/user.service';
import { blackjackManager } from './blackjack.service';
import { NotFoundError } from '../../../errors';

export const placeBet = async (
  req: Request,
  res: Response<ApiResponse<BlackjackPlayRoundResponse> | { message: string }>
) => {
  const { betAmount } = validateBetRequest(req.body as { betAmount: number });
  const user = req.user as User;

  await validateActiveBet(user.id);

  const userInstance = await userManager.getUser(user.id);

  // Convert betAmount to cents for comparison and storage
  const betAmountInCents = Math.round(betAmount * 100);
  const userBalanceInCents = userInstance.getBalanceAsNumber();

  if (userBalanceInCents < betAmountInCents) {
    throw new Error('Insufficient balance');
  }

  const game = await blackjackManager.createGame({
    betAmount: betAmountInCents, // Pass amount in cents
    userId: user.id,
  });

  const dbUpdateObject = game.getDbUpdateObject();

  const payout =
    dbUpdateObject && 'active' in dbUpdateObject.data
      ? dbUpdateObject.data.payoutAmount
      : 0;

  if (payout) {
    blackjackManager.deleteGame(user.id);
  }

  // Calculate new balance after deducting bet amount
  const balanceChangeInCents = -betAmountInCents; // Negative because we're deducting
  const newBalance = (
    userBalanceInCents +
    balanceChangeInCents +
    payout
  ).toString();

  // Update user balance in a transaction
  await db.$transaction(async tx => {
    if (dbUpdateObject) {
      await tx.bet.update(dbUpdateObject);
    }
    await tx.user.update({
      where: { id: user.id },
      data: {
        balance: newBalance,
      },
    });
  });

  // Update the user instance with the new balance
  userInstance.setBalance(newBalance);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, game.getPlayRoundResponse(newBalance))
    );
};

export const getActiveGame = async (
  req: Request,
  res: Response<ApiResponse<BlackjackPlayRoundResponse> | { message: string }>
) => {
  const userId = (req.user as User).id;
  const game = await blackjackManager.getGame(userId);
  const userInstance = await userManager.getUser(userId);

  const balance = userInstance.getBalance();

  if (!game || !game.getBet().active) {
    throw new NotFoundError('Game not found');
  }

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, game.getPlayRoundResponse(balance)));
};

export const blackjackNext = async (
  req: Request,
  res: Response<ApiResponse<BlackjackPlayRoundResponse> | { message: string }>
) => {
  const { action } = validatePlayRequest(req.body as { action: string });
  const userId = (req.user as User).id;
  const game = await blackjackManager.getGame(userId);

  if (!game?.getBet().active) {
    throw new NotFoundError('Game not found');
  }

  const moneySpent = game.playRound(action as BlackjackActions);
  const dbUpdateObject = game.getDbUpdateObject();

  if (dbUpdateObject) {
    if ('active' in dbUpdateObject.data) {
      blackjackManager.deleteGame(userId);
    }
    await db.bet.update(dbUpdateObject);
  }

  const userInstance = await userManager.getUser(userId);
  const userBalanceInCents = userInstance.getBalanceAsNumber();

  const newBalance = (userBalanceInCents + moneySpent).toString();

  // Update user balance in a transaction
  await db.$transaction(async tx => {
    await tx.user.update({
      where: { id: userId },
      data: {
        balance: newBalance,
      },
    });
  });

  userInstance.setBalance(newBalance);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, game.getPlayRoundResponse(newBalance))
    );
};

const validateBetRequest = (body: { betAmount: number }) => {
  const result = BlackjackBetSchema.safeParse(body);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

const validateActiveBet = async (userId: string) => {
  const game = await blackjackManager.getGame(userId);
  if (game && game.getBet().active) {
    throw new Error('You already have an active bet');
  }
};

const validatePlayRequest = (body: { action: string }) => {
  const result = BlackjackPlayRoundSchema.safeParse(body);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};
