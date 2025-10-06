import { type CardDeck, CardRanks } from './types';
import { CardSuits } from './types';

const SUIT_ORDER = [
  CardSuits.DIAMONDS,
  CardSuits.HEARTS,
  CardSuits.SPADES,
  CardSuits.CLUBS,
];

const SUIT_TEXT = {
  [CardSuits.DIAMONDS]: '♦',
  [CardSuits.HEARTS]: '♥',
  [CardSuits.SPADES]: '♠',
  [CardSuits.CLUBS]: '♣',
};

const RANK_VALUE_MAP: Record<string, number> = {
  [CardRanks.TWO]: 2,
  [CardRanks.THREE]: 3,
  [CardRanks.FOUR]: 4,
  [CardRanks.FIVE]: 5,
  [CardRanks.SIX]: 6,
  [CardRanks.SEVEN]: 7,
  [CardRanks.EIGHT]: 8,
  [CardRanks.NINE]: 9,
  [CardRanks.TEN]: 10,
  [CardRanks.JACK]: 11,
  [CardRanks.QUEEN]: 12,
  [CardRanks.KING]: 13,
  [CardRanks.ACE]: 1,
};

const VALUE_RANK_MAP: Record<number, CardRanks> = {
  2: CardRanks.TWO,
  3: CardRanks.THREE,
  4: CardRanks.FOUR,
  5: CardRanks.FIVE,
  6: CardRanks.SIX,
  7: CardRanks.SEVEN,
  8: CardRanks.EIGHT,
  9: CardRanks.NINE,
  10: CardRanks.TEN,
  11: CardRanks.JACK,
  12: CardRanks.QUEEN,
  13: CardRanks.KING,
  1: CardRanks.ACE, // Ace is considered the lowest rank in some games,
};

const BLACKJACK_RANK_VALUE_MAP: Record<CardRanks, number> = {
  [CardRanks.TWO]: 2,
  [CardRanks.THREE]: 3,
  [CardRanks.FOUR]: 4,
  [CardRanks.FIVE]: 5,
  [CardRanks.SIX]: 6,
  [CardRanks.SEVEN]: 7,
  [CardRanks.EIGHT]: 8,
  [CardRanks.NINE]: 9,
  [CardRanks.TEN]: 10,
  [CardRanks.JACK]: 10,
  [CardRanks.QUEEN]: 10,
  [CardRanks.KING]: 10,
  [CardRanks.ACE]: 11, // Ace is considered 11 in Blackjack
};

const CARD_DECK: CardDeck[] = [
  ...Array.from({ length: 48 }, (_, i) => {
    const suit = SUIT_ORDER[Math.floor(i % 4)];
    const rank = VALUE_RANK_MAP[Math.floor(i / 4) + 2];
    return {
      suit,
      rank,
    };
  }),
  {
    suit: SUIT_ORDER[0],
    rank: CardRanks.ACE,
  },
  {
    suit: SUIT_ORDER[1],
    rank: CardRanks.ACE,
  },
  {
    suit: SUIT_ORDER[2],
    rank: CardRanks.ACE,
  },
  {
    suit: SUIT_ORDER[3],
    rank: CardRanks.ACE,
  },
].map(card => ({ ...card, id: crypto.randomUUID() }));

export {
  BLACKJACK_RANK_VALUE_MAP,
  CARD_DECK,
  RANK_VALUE_MAP,
  SUIT_TEXT,
  VALUE_RANK_MAP,
};
