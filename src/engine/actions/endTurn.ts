import { GameState } from '../../types/game';
import { updateMarketPrices } from '../market/prices';
import { drawCards } from './drawCards';
import { DebtEvent, GameEvent } from '../../types/events';

export const endTurn = (state: GameState): [GameState, GameEvent[]] => {
  const events: GameEvent[] = [];
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
    
    const debtEvent: DebtEvent = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Debt payment due in ${newState.debtPaymentDue} turns`,
      type: 'debt',
      timestamp: Date.now(),
      details: {
        amount: newState.debt,
        turnsUntilDue: newState.debtPaymentDue
      }
    };
    events.push(debtEvent);

    if (newState.debtPaymentDue === 0) {
      if (newState.credits >= newState.debt) {
        newState.credits -= newState.debt;
        newState.debt = 0;
        events.push({
          id: Math.random().toString(36).substr(2, 9),
          message: 'Debt paid in full',
          type: 'success',
          timestamp: Date.now()
        });
      } else {
        const penalty = Math.floor(newState.debt * 0.1);
        newState.stress += 1;
        newState.debt += penalty;
        newState.debtPaymentDue = 3; // New payment due in 3 turns
        
        events.push({
          id: Math.random().toString(36).substr(2, 9),
          message: `Unable to pay debt! Penalty of ${penalty} credits added`,
          type: 'danger',
          timestamp: Date.now()
        });
      }
    }
  }

  // Update market prices every 3 turns
  if (state.turn % 3 === 0) {
    const [updatedState, marketEvents] = updateMarketPrices(newState);
    newState = updatedState;
    events.push(...marketEvents);
  }

  // Draw new hand
  newState = drawCards(newState, 5);

  return [newState, events];
};