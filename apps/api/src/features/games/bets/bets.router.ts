import { Router } from 'express';
import { getBet, getBets } from './bets.controller';
import { verifyMe } from '../../../middlewares/bet.middleware';

const betsRouter: Router = Router();

betsRouter.get('/', getBets);
betsRouter.get('/:betId', verifyMe, getBet);

export default betsRouter;
