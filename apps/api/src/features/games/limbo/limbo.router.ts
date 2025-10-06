import { Router } from 'express';
import { placeBet } from './limbo.controller';

const limboRouter: Router = Router();

limboRouter.post('/place-bet', placeBet);

export default limboRouter;
