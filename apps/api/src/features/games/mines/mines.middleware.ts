import type { Request, Response, NextFunction } from 'express';
import { UserInstance, userManager } from '../../user/user.service';
import { User } from '@prisma/client';
import { Mines, minesManager } from './mines.service';
import { BadRequestError } from '../../../errors';

interface PlayRoundRequestBody {
  selectedTileIndex: number;
  id: string;
}

declare module 'express' {
  interface Request {
    validatedRequest?: {
      selectedTileIndex: number;
      game: Mines;
      userInstance: UserInstance;
    };
  }
}

export const validatePlayRoundRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as User).id;
  const userInstance = await userManager.getUser(userId);
  const user = userInstance.getUser();

  const game = await minesManager.getGame(user.id);

  if (!game?.getBet().active) {
    throw new BadRequestError('Game not found');
  }

  const { selectedTileIndex } = req.body as PlayRoundRequestBody;

  game.validatePlayRound(selectedTileIndex);

  req.validatedRequest = {
    selectedTileIndex,
    game,
    userInstance,
  };

  next();
};
