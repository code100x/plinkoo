import type { Request, Response, NextFunction } from 'express';
import type { User, Game } from '@prisma/client';
import { BadRequestError, UnAuthenticatedError } from '../errors';
import { validateBetAmount } from '../utils/bet.utils';
import { userManager } from '../features/user/user.service';

declare module 'express' {
  interface Request {
    validatedBet?: {
      betAmountInCents: number;
      userBalanceInCents: number;
      userInstance: any;
    };
    isMyBet?: boolean;
  }
}

export interface BetValidationMiddlewareOptions {
  game?: Game;
  betAmountField?: string;
}

/**
 * Middleware to validate bet amount and user balance
 */
export const validateBet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  if (!user) {
    throw new UnAuthenticatedError('Authentication required');
  }
  const betAmount = req.body.betAmount;

  if (!betAmount || typeof betAmount !== 'number') {
    throw new BadRequestError(`betAmount is required and must be a number`);
  }

  // Get user instance
  const userInstance = await userManager.getUser(user.id);

  // Validate bet amount and balance
  const validatedBet = await validateBetAmount({
    betAmount,
    userInstance,
  });
  // Attach validated data to request
  req.validatedBet = { ...validatedBet, userInstance };

  next();
};

/**
 * Middleware to check if user has any active bets for a specific game
 */
export const checkActiveGame = (game: Game) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User;
      if (!user) {
        throw new UnAuthenticatedError('Authentication required');
      }

      // This would need to be implemented based on your game managers
      // For now, this is a placeholder
      // const hasActiveBet = await checkUserActiveGame(user.id, game);
      // if (hasActiveBet) {
      //   throw new BadRequestError(`You already have an active ${game} game`);
      // }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to validate request body against a schema
 */
export const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        throw new BadRequestError(result.error.message);
      }

      // Replace body with validated data
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to validate game-specific constraints
 */
export const validateGameConstraints = (constraints: {
  maxBetAmount?: number;
  minBetAmount?: number;
  allowedRiskLevels?: string[];
  maxSelections?: number;
  minSelections?: number;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { betAmount, risk, selectedTiles, ...rest } = req.body;

      // Validate bet amount constraints
      if (constraints.maxBetAmount && betAmount > constraints.maxBetAmount) {
        throw new BadRequestError(
          `Maximum bet amount is $${constraints.maxBetAmount}`
        );
      }

      if (constraints.minBetAmount && betAmount < constraints.minBetAmount) {
        throw new BadRequestError(
          `Minimum bet amount is $${constraints.minBetAmount}`
        );
      }

      // Validate risk levels (for games like Keno)
      if (
        constraints.allowedRiskLevels &&
        risk &&
        !constraints.allowedRiskLevels.includes(risk)
      ) {
        throw new BadRequestError(
          `Invalid risk level. Allowed: ${constraints.allowedRiskLevels.join(', ')}`
        );
      }

      // Validate selections (for games like Keno, Mines)
      if (selectedTiles && Array.isArray(selectedTiles)) {
        if (
          constraints.maxSelections &&
          selectedTiles.length > constraints.maxSelections
        ) {
          throw new BadRequestError(
            `Maximum ${constraints.maxSelections} selections allowed`
          );
        }

        if (
          constraints.minSelections &&
          selectedTiles.length < constraints.minSelections
        ) {
          throw new BadRequestError(
            `Minimum ${constraints.minSelections} selections required`
          );
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const verifyMe = (req: Request, res: Response, next: NextFunction) => {
  req.isMyBet = req.isAuthenticated();
  next();
};
