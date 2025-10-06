import type { Request, Response } from 'express';
import { calculateOutcome } from './plinkoo.service';

export const getOutcome = (req: Request, res: Response): void => {
  const { clientSeed = 'P7xjSv-1ff' } = req.body as {
    clientSeed: string;
  };
  const result = calculateOutcome(clientSeed);
  res.send(result);
};
