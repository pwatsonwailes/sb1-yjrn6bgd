import { useState, useCallback } from 'react';
import { Card, GameState } from '../types/game';
import { getInitialState } from '../data/initialState';
import { playCard as playCardAction } from '../engine/actions/playCard';
import { drawCards as drawCardsAction } from '../engine/actions/drawCards';
import { endTurn as endTurnAction } from '../engine/actions/endTurn';
import { GameEvent } from '../types/events';
import { useFactions } from './useFactions';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [playingCards, setPlayingCards] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<GameEvent[]>([]);
  const { factions, updateFactionReputation } = useFactions();

  const addEvent = useCallback((event: Omit<GameEvent, 'id' | 'timestamp'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setEvents(current => [...current, newEvent]);
    setTimeout(() => {
      setEvents(current => current.filter(e => e.id !== newEvent.id));
    }, event.type === 'market' ? 5000 : 3000);
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
    
    setPlayingCards(new Set(selectedCards));
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (const card of selectedCardObjects) {
      newState = playCardAction(newState, card);
      
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
    
    const newState = await playSelectedCards();
    const [finalState, newEvents] = endTurnAction(newState);
    
    setSelectedCards(new Set());
    setPlayingCards(new Set());
    setGameState(finalState);
    
    newEvents.forEach(addEvent);
    
    addEvent({
      message: `Turn ${finalState.turn} started`,
      type: 'info'
    });
  }, [playSelectedCards, addEvent]);

  const handleCardEffect = useCallback((card: Card, effect: CardEffect) => {
    if (effect.type === 'reputation' && effect.factionId) {
      const faction = factions.find(f => f.id === effect.factionId);
      if (faction) {
        const oldReputation = faction.reputation;
        updateFactionReputation(effect.factionId, effect.value);
        
        addEvent({
          type: 'reputation',
          message: `${faction.name} reputation ${effect.value > 0 ? 'increased' : 'decreased'}`,
          details: {
            factionId: effect.factionId,
            oldReputation,
            newReputation: oldReputation + effect.value,
            change: effect.value
          }
        });
      }
    }
  }, [factions, updateFactionReputation, addEvent]);

  const updateDeck = useCallback((newDeck: Card[]) => {
    setGameState(current => ({
      ...current,
      deck: newDeck
    }));

    addEvent({
      message: 'Deck updated',
      type: 'info'
    });
  }, [addEvent]);

  const purchaseCard = useCallback((card: Card) => {
    const cost = calculateCardCost(card);
    
    setGameState(current => ({
      ...current,
      credits: current.credits - cost,
      deck: [...current.deck, { ...card, id: `${card.id}-${Date.now()}` }]
    }));
  
    addEvent({
      message: `Purchased ${card.name}`,
      type: 'success'
    });
  }, [addEvent]);

  return {
    gameState,
    selectedCards,
    playingCards,
    events,
    factions,
    drawCards,
    selectCard,
    endTurn,
    updateFactionReputation,
    updateDeck,
    purchaseCard
  };
};