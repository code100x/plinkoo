import { NO_OF_TILES } from '@repo/common/game-utils/mines/constants.js';
import type {
  MinesBet,
  MinesGameOverResponse,
  MinesHiddenState,
  MinesPlayRoundResponse,
  MinesRevealedState,
} from '@repo/common/game-utils/mines/types.js';
import db from '@repo/db';
import type { Bet } from '@prisma/client';
import {
  convertFloatsToGameEvents,
  calculateMines,
} from '@repo/common/game-utils/mines/utils.js';
import { userManager, UserInstance } from '../../user/user.service';
import { payouts } from './mines.constant';
import {
  createBetTransaction,
  editBetAndUpdateBalance,
  minorToAmount,
} from '../../../utils/bet.utils';
import { BadRequestError } from '../../../errors';

class MinesManager {
  private static instance: MinesManager | undefined;
  private games: Map<string, Mines>;

  private constructor() {
    this.games = new Map();
  }

  static getInstance() {
    if (!MinesManager.instance) {
      MinesManager.instance = new MinesManager();
    }
    return MinesManager.instance;
  }

  async getGame(userId: string) {
    if (!this.games.has(userId)) {
      const bet = await db.bet.findFirst({
        where: { userId, active: true, game: 'mines' },
      });
      if (!bet) {
        return null;
      }
      const game = new Mines(bet);
      this.games.set(userId, game);
    }
    return this.games.get(userId);
  }

  async createGame({
    minesCount,
    betAmount,
    userInstance,
  }: MinesBet & { userInstance: UserInstance }) {
    const floats = userInstance.generateFloats(NO_OF_TILES - 1);
    const gameEvents = convertFloatsToGameEvents(floats, NO_OF_TILES);
    const mines = calculateMines(gameEvents, minesCount);
    const transaction = await createBetTransaction({
      active: true,
      betAmount,
      game: 'mines',
      gameState: { mines, minesCount, rounds: [] },
      userInstance,
    });
    const game = new Mines(transaction.bet);
    this.games.set(userInstance.getUserId(), game);
    return transaction;
  }

  deleteGame(userId: string) {
    this.games.delete(userId);
  }
}

export class Mines {
  private bet: Bet;
  private rounds: { selectedTileIndex: number; payoutMultiplier: number }[] =
    [];
  private selectedTiles: number[] = [];
  constructor(bet: Bet) {
    this.bet = bet;
  }

  getBet() {
    return this.bet;
  }

  getRounds() {
    return this.rounds;
  }

  validatePlayRound(selectedTileIndex: number) {
    if (this.selectedTiles.includes(selectedTileIndex)) {
      throw new BadRequestError('Tile already selected');
    }
    if (this.rounds.length === NO_OF_TILES - 1) {
      throw new BadRequestError('Game over');
    }
    if (!this.bet.state) {
      throw new BadRequestError('Game state not found');
    }

    const { mines } = this.bet.state as unknown as
      | MinesHiddenState
      | MinesRevealedState;

    if (!mines) {
      throw new BadRequestError('Game not started');
    }
  }

  async updateDbAndGetGameState(
    minesCount: number
  ): Promise<MinesPlayRoundResponse> {
    await db.bet.update({
      where: { id: this.bet.id, active: true },
      data: {
        state: {
          ...(this.bet.state as unknown as MinesHiddenState),
          rounds: this.rounds,
        },
      },
    });
    return {
      id: this.bet.id,
      active: true,
      state: {
        rounds: this.rounds,
        mines: null,
        minesCount,
      },
      betAmount: this.bet.betAmount / 100,
    };
  }

  async playRound(
    selectedTileIndex: number
  ): Promise<MinesPlayRoundResponse | MinesGameOverResponse> {
    this.selectedTiles.push(selectedTileIndex);
    const { mines, minesCount } = this.bet
      .state as unknown as MinesRevealedState;

    if (mines.includes(selectedTileIndex)) {
      this.rounds.push({ selectedTileIndex, payoutMultiplier: 0 });
      return this.getGameOverState(this.bet.userId);
    }

    const gemsCount = this.rounds.length + 1;
    const payoutMultiplier = payouts[gemsCount][minesCount];
    this.rounds.push({ selectedTileIndex, payoutMultiplier });

    return await this.updateDbAndGetGameState(minesCount);
  }

  async cashOut(userId: string) {
    if (this.rounds.length === 0) {
      throw new Error('Game not started');
    }
    return this.getGameOverState(userId);
  }

  private async getGameOverState(
    userId: string
  ): Promise<MinesGameOverResponse> {
    const userInstance = await userManager.getUser(userId);
    const payoutMultiplier = this.rounds.at(-1)?.payoutMultiplier || 0;
    const payoutAmount = payoutMultiplier * this.bet.betAmount;

    const { newBalance } = await editBetAndUpdateBalance({
      betId: this.bet.id,
      userInstance,
      payoutAmount,
      betAmount: 0,
      data: {
        payoutAmount,
        active: false,
        state: {
          ...(this.bet.state as unknown as MinesRevealedState),
          rounds: this.rounds,
        },
      },
    });
    return {
      id: this.bet.id,
      state: {
        ...(this.bet.state as unknown as MinesRevealedState),
        rounds: this.rounds,
      },
      payoutMultiplier,
      payout: minorToAmount(payoutAmount),
      balance: minorToAmount(parseFloat(newBalance)),
      active: false,
    };
  }
}

export const minesManager = MinesManager.getInstance();
