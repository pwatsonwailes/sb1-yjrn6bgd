import { GameState } from '../../types/game';
import { updateMarketPrices } from '../market/prices';
import { drawCards } from './drawCards';

export const endTurn = (state: GameState): GameState => {
  const newDiscardPile = [...state.discardPile, ...state.hand];
  
  let newState = {
    ...state,
    hand: [],
    discardPile: newDiscardPile,
    energyPoints: 5, // Reset EP
    turn: state.turn + 1,
  };

  // Handle debt payment countdown
  if (newState.debtPaymentDue > 0) {
    newState.debtPaymentDue--;
    if (newState.debtPaymentDue === 0) {
      newState.stress++;
    }
  }

  // Update market prices every 3 turns
  if (state.turn % 3 === 0) {
    newState = updateMarketPrices(newState);
  }

  // Draw new hand
  newState = drawCards(newState, 5);

  return newState;
};