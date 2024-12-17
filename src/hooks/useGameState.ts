import { useState, useCallback } from 'react';
import { Card, GameState } from '../types/game';
import { getInitialState } from '../data/initialState';
import { playCard as playCardAction } from '../engine/actions/playCard';
import { drawCards as drawCardsAction } from '../engine/actions/drawCards';
import { endTurn as endTurnAction } from '../engine/actions/endTurn';
import { GameEvent } from '../components/EventLog';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [playingCards, setPlayingCards] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<GameEvent[]>([]);

  const addEvent = useCallback((event: Omit<GameEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9)
    };
    setEvents(current => [...current, newEvent]);
    setTimeout(() => {
      setEvents(current => current.filter(e => e.id !== newEvent.id));
    }, 3000);
  }, []);

  const drawCards = useCallback((count: number) => {
    setGameState(state => drawCardsAction(state, count));
  }, []);

  const selectCard = useCallback((card: Card) => {
    setSelectedCards(current => {
      const newSelected = new Set(current);
      if (newSelected.has(card.id)) {
        newSelected.delete(card.id);
      } else {
        newSelected.add(card.id);
      }
      return newSelected;
    });
  }, []);

  const playSelectedCards = useCallback(async () => {
    let newState = { ...gameState };
    const selectedCardObjects = gameState.hand.filter(card => selectedCards.has(card.id));
    
    // Mark cards as playing for animation
    setPlayingCards(new Set(selectedCards));
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Play each selected card
    for (const card of selectedCardObjects) {
      newState = playCardAction(newState, card);
      
      // Add event for card effects
      card.effects.forEach(effect => {
        if (!effect.chance || Math.random() <= effect.chance) {
          addEvent({
            message: `${card.name}: ${effect.value > 0 ? '+' : ''}${effect.value} ${effect.type}`,
            type: effect.value > 0 ? 'success' : 'danger'
          });
        }
      });
    }
    
    return newState;
  }, [gameState, selectedCards, addEvent]);

  const endTurn = useCallback(async () => {
    if (selectedCards.size === 0) return;
    
    // First play all selected cards
    const newState = await playSelectedCards();
    
    // Then process end of turn
    const finalState = endTurnAction(newState);
    
    // Reset selections and update game state
    setSelectedCards(new Set());
    setPlayingCards(new Set());
    setGameState(finalState);
    
    addEvent({
      message: `Turn ${finalState.turn} ended`,
      type: 'info'
    });
  }, [playSelectedCards, addEvent]);

  return {
    gameState,
    selectedCards,
    playingCards,
    events,
    drawCards,
    selectCard,
    endTurn,
  };
};