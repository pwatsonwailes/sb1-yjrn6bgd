import { GameState } from '../../types/game';
import { shuffleArray } from '../../utils/array';

export const drawCards = (state: GameState, count: number): GameState => {
  const newHand = [...state.hand];
  let newDeck = [...state.deck];
  let newDiscardPile = [...state.discardPile];

  for (let i = 0; i < count; i++) {
    if (newDeck.length === 0) {
      newDeck = shuffleArray(newDiscardPile);
      newDiscardPile = [];
    }
    if (newDeck.length > 0) {
      const card = newDeck.pop()!;
      newHand.push(card);
    }
  }

  return {
    ...state,
    deck: newDeck,
    hand: newHand,
    discardPile: newDiscardPile,
  };
};