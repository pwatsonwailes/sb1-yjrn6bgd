import { GameState } from '../../types/game';
import { updateMarketPrices } from '../market/prices';
import { drawCards } from './drawCards';
import { DebtEvent, GameEvent } from '../../types/events';
import { generateRandomCard } from '../cards/cardGeneration';
import { CardPenalty } from '../../types/cards';

const applyCardPenalty = (state: GameState, penalty: CardPenalty): [GameState, GameEvent] => {
  let newState = { ...state };
  let value = penalty.value;

  if (penalty.percentage) {
    value = Math.floor(state[penalty.type] * (penalty.value / 100));
  }

  newState[penalty.type] += value;

  const event: GameEvent = {
    id: Math.random().toString(36).substr(2, 9),
    message: `Missed payment: ${value} ${penalty.type}`,
    type: 'danger',
    timestamp: Date.now()
  };

  return [newState, event];
};

export const endTurn = (state: GameState, selectedCards: Set<string>): [GameState, GameEvent[]] => {
  const events: GameEvent[] = [];
  const newDiscardPile = [...state.discardPile];
  
  // Count played and discarded cards
  const playedCardCount = state.hand.filter(card => selectedCards.has(card.id)).length;
  const discardedCardCount = state.hand.length - playedCardCount;
  const totalCardsToAdd = playedCardCount + discardedCardCount;
  
  // Generate new random cards
  const newCards = Array.from({ length: totalCardsToAdd }, () => generateRandomCard());
  
  // Check for unplayed mandatory cards and apply penalties
  state.hand.forEach(card => {
    if (card.mandatory && card.penalty && !selectedCards.has(card.id)) {
      const [updatedState, penaltyEvent] = applyCardPenalty(state, card.penalty);
      state = updatedState;
      events.push(penaltyEvent);
    }
    newDiscardPile.push(card);
  });
  
  let newState = {
    ...state,
    hand: [],
    discardPile: newDiscardPile,
    deck: [...state.deck, ...newCards],
    energyPoints: 5,
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

  // Add event for new cards
  if (newCards.length > 0) {
    events.push({
      id: Math.random().toString(36).substr(2, 9),
      message: `Added ${newCards.length} new card${newCards.length > 1 ? 's' : ''} to your deck`,
      type: 'info',
      timestamp: Date.now()
    });
  }

  return [newState, events];
};