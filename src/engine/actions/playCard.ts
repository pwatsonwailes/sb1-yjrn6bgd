import { GameState, Card } from '../../types/game';
import { applyCardEffects } from './effects';
import { drawCards } from './drawCards';

export const playCard = (state: GameState, card: Card): GameState => {
  if (state.energyPoints < card.cost.energy || 
      (card.cost.credits && state.credits < card.cost.credits)) {
    return state;
  }

  const newHand = state.hand.filter(c => c.id !== card.id);
  const newDiscardPile = [...state.discardPile, card];
  
  // Apply costs
  let newState = {
    ...state,
    energyPoints: state.energyPoints - card.cost.energy,
    credits: card.cost.credits ? state.credits - card.cost.credits : state.credits,
    hand: newHand,
    discardPile: newDiscardPile,
  };

  // Apply card effects
  newState = applyCardEffects(newState, card);

  // Draw back up to 5 cards
  const cardsToDraw = 5 - newState.hand.length;
  if (cardsToDraw > 0) {
    newState = drawCards(newState, cardsToDraw);
  }

  return newState;
};