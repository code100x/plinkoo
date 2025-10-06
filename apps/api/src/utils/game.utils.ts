import type { Game } from '@prisma/client';
import {
  BetTransactionResult,
  minorToAmount,
  validateAndCreateBet,
} from '../utils/bet.utils';
import { ApiResponse } from '@repo/common/types';
import { StatusCodes } from 'http-status-codes';
import type { Response } from 'express';

export interface GameResult {
  gameState: any;
  payout: number;
  payoutMultiplier: number;
}

export interface GameResponse {
  id: string;
  state: any;
  payout: number;
  payoutMultiplier: number;
  balance: number;
  betAmount: number;
}

/**
 * Base class for game services
 */
export abstract class BaseGameService {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  /**
   * Process a complete game round
   */
  async processGameRound({
    userId,
    betAmount,
    gameInput,
    userInstance,
  }: {
    userId: string;
    betAmount: number;
    gameInput: any;
    userInstance: any;
  }): Promise<GameResponse> {
    // 1. Generate game result
    const result = await this.generateGameResult(gameInput, userInstance);

    // 2. Create bet transaction
    const transaction = await validateAndCreateBet({
      betAmount,
      userInstance,
      game: this.game,
      gameState: result.gameState,
      payoutAmount: result.payout,
      active: false,
    });

    // 3. Return formatted response
    return {
      id: transaction.betId,
      state: result.gameState,
      payout: result.payout,
      payoutMultiplier: result.payoutMultiplier,
      balance: parseFloat(transaction.newBalance) / 100, // Convert to dollars
      betAmount,
    };
  }

  /**
   * Send standardized game response
   */
  sendGameResponse(res: Response, data: GameResponse): void {
    res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, data));
  }

  /**
   * Abstract method to be implemented by each game
   */
  protected abstract generateGameResult(
    gameInput: any,
    userInstance: any
  ): Promise<GameResult>;
}

/**
 * Factory function to create game-specific constraints
 */
export const createGameConstraints = (game: Game) => {
  const constraints = {
    dice: {
      minBetAmount: 0.01,
      maxBetAmount: 1000,
    },
    keno: {
      minBetAmount: 0.01,
      maxBetAmount: 1000,
      allowedRiskLevels: ['low', 'medium', 'high'],
      maxSelections: 10,
      minSelections: 1,
    },
    roulette: {
      minBetAmount: 0.01,
      maxBetAmount: 500,
    },
    blackjack: {
      minBetAmount: 0.01,
      maxBetAmount: 1000,
    },
    mines: {
      minBetAmount: 0.01,
      maxBetAmount: 1000,
      maxSelections: 24,
      minSelections: 1,
    },
  };

  return constraints[game] || {};
};

/**
 * Common validation for game inputs
 */
export const validateGameInput = (game: Game, input: any): void => {
  switch (game) {
    case 'dice':
      if (!input.target || !input.condition) {
        throw new Error('Target and condition are required for dice game');
      }
      break;
    case 'keno':
      if (!input.selectedTiles || !Array.isArray(input.selectedTiles)) {
        throw new Error('Selected tiles are required for keno game');
      }
      break;
    case 'roulette':
      if (!input.bets || !Array.isArray(input.bets)) {
        throw new Error('Bets are required for roulette game');
      }
      break;
    // Add more game validations as needed
  }
};

/**
 * Common response formatter for all games
 */
export const formatGameResponse = (
  result: GameResult,
  betTransaction: BetTransactionResult,
  betAmount: number
): GameResponse => {
  return {
    id: betTransaction.betId,
    state: result.gameState,
    payout: result.payout,
    payoutMultiplier: result.payoutMultiplier,
    balance: minorToAmount(parseFloat(betTransaction.newBalance)),
    betAmount,
  };
};
