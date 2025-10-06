import type { Request, Response } from 'express';
import { getResult } from './limbo.service';

interface LimboRequestBody {
  clientSeed: string;
}

export const placeBet = (req: Request, res: Response) => {
  const { clientSeed } = req.body as LimboRequestBody;

  const result = getResult(clientSeed);

  res.status(200).json({ result });
};
