import type { Request, Response } from 'express';
import { MinesBetSchema } from '@repo/common/game-utils/mines/validations.js';
import type { User } from '@prisma/client';
import { ApiResponse } from '@repo/common/types';
import { StatusCodes } from 'http-status-codes';
import type {
  MinesGameOverResponse,
  MinesHiddenState,
  MinesPlayRoundResponse,
} from '@repo/common/game-utils/mines/types.js';
import { minesManager } from './mines.service';
import { BadRequestError, NotFoundError } from '../../../errors';
import { minorToAmount } from '../../../utils/bet.utils';

export const startGame = async (
  req: Request,
  res: Response<ApiResponse<MinesPlayRoundResponse> | { message: string }>
) => {
  const validationResult = MinesBetSchema.safeParse(req.body);

  const { betAmountInCents, userInstance } = req.validatedBet!;

  if (!validationResult.success) {
    throw new BadRequestError(validationResult.error.message);
  }

  const { minesCount } = validationResult.data;

  const transaction = await minesManager.createGame({
    betAmount: betAmountInCents,
    minesCount,
    userInstance,
  });

  const { bet, newBalance } = transaction;

  res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      id: bet.id,
      active: true,
      state: { mines: null, minesCount, rounds: [] },
      betAmount: minorToAmount(betAmountInCents),
      balance: minorToAmount(parseFloat(newBalance)),
    })
  );
};

export const playRound = async (
  req: Request,
  res: Response<
    | ApiResponse<MinesPlayRoundResponse | MinesGameOverResponse | undefined>
    | { message: string }
  >
) => {
  const { selectedTileIndex, game, userInstance } = req.validatedRequest!;
  const gameState = await game.playRound(selectedTileIndex);
  if (!gameState.active) {
    minesManager.deleteGame(userInstance.getUserId());
  }
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, gameState));
};

export const cashOut = async (
  req: Request,
  res: Response<
    ApiResponse<MinesGameOverResponse | undefined> | { message: string }
  >
) => {
  const userId = (req.user as User).id;
  const game = await minesManager.getGame(userId);
  if (!game?.getBet().active) {
    throw new NotFoundError('Game not found');
  }

  const gameState = await game.cashOut(userId);
  minesManager.deleteGame(userId);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, gameState));
};

export const getActiveGame = async (
  req: Request,
  res: Response<
    ApiResponse<MinesPlayRoundResponse | undefined> | { message: string }
  >
) => {
  const userId = (req.user as User).id;
  const game = await minesManager.getGame(userId);

  if (!game) {
    throw new NotFoundError('Game not found');
  }

  const activeBet = game.getBet();

  if (!activeBet.active || !activeBet.state) {
    throw new NotFoundError('Game not found');
  }

  return res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      id: activeBet.id,
      active: activeBet.active,
      state: {
        mines: null,
        rounds: game.getRounds(),
        minesCount: (activeBet.state as unknown as MinesHiddenState).minesCount,
      },
      betAmount: activeBet.betAmount / 100,
    })
  );
};
