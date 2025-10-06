import { Router } from 'express';
import plinkooRouter from './plinkoo/plinkoo.router';
import minesRouter from './mines/mines.router';
import limboRouter from './limbo/limbo.router';
import kenoRouter from './keno/keno.router';
import diceRouter from './dice/dice.router';
import rouletteRouter from './roulette/roulette.router';
import blackjackRouter from './blackjack/blackjack.router';
import betsRouter from './bets/bets.router';

const gameRouter: Router = Router();

gameRouter.use('/plinkoo', plinkooRouter);
gameRouter.use('/mines', minesRouter);
gameRouter.use('/limbo', limboRouter);
gameRouter.use('/keno', kenoRouter);
gameRouter.use('/dice', diceRouter);
gameRouter.use('/roulette', rouletteRouter);
gameRouter.use('/blackjack', blackjackRouter);
gameRouter.use('/bets', betsRouter);

export default gameRouter;
