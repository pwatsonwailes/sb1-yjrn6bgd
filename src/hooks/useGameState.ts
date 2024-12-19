import { useState, useCallback } from 'react';
import { Card, GameState } from '../types/game';
import { CardEffect } from '../types/cards';
import { getInitialState } from '../data/initialState';
import { playCard as playCardAction } from '../engine/actions/playCard';
import { drawCards as drawCardsAction } from '../engine/actions/drawCards';
import { endTurn as endTurnAction } from '../engine/actions/endTurn';
import { useFactions } from './useFactions';
import { useEvents } from './useEvents';
import { useGoals } from './useGoals';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [playingCards, setPlayingCards] = useState<Set<string>>(new Set());
  const { factions, updateFactionReputation } = useFactions();
  const { events, addEvent } = useEvents();
  const { 
    goals, 
    investInGoal, 
    updateGoalTimers, 
    activateGoal 
  } = useGoals(factions.map(f => f.id));

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

  const handleCardEffect = useCallback((effect: CardEffect) => {
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

  const purchaseCard = useCallback((card: Card, cost: number) => {
    const creditCost = cost ? cost : 0;

    setGameState(current => ({
      ...current,
      credits: current.credits - creditCost,
      deck: [...current.deck, { ...card, id: `${card.id}-${Date.now()}` }]
    }));
  
    addEvent({
      message: `Purchased ${card.name}`,
      type: 'success'
    });
  }, [addEvent]);

  const handleGoalInvestment = useCallback((
    goalId: string,
    type: 'credits' | 'energy',
    amount: number
  ) => {
    setGameState(current => {
      const resourceKey = type === 'credits' ? 'credits' : 'energyPoints';
      if (current[resourceKey] < amount) return current;

      investInGoal(goalId, type, amount);
      
      return {
        ...current,
        [resourceKey]: current[resourceKey] - amount
      };
    });
  }, [investInGoal]);

  const handleGoalActivation = useCallback((goalId: string) => {
    activateGoal(goalId);
    addEvent({
      message: 'New goal activated',
      type: 'info'
    });
  }, [activateGoal, addEvent]);

  const endTurn = useCallback(async () => {
    if (selectedCards.size === 0) return;
    
    const newState = await playSelectedCards();
    const [finalState, newEvents] = endTurnAction(newState, selectedCards);
    
    // Update goal timers
    updateGoalTimers();
    
    setSelectedCards(new Set());
    setPlayingCards(new Set());
    setGameState(finalState);
    
    newEvents.forEach(addEvent);
    
    addEvent({
      message: `Turn ${finalState.turn} started`,
      type: 'info'
    });
  }, [playSelectedCards, addEvent, updateGoalTimers]);

  return {
    gameState,
    selectedCards,
    playingCards,
    events,
    factions,
    goals,
    drawCards,
    selectCard,
    endTurn,
    handleCardEffect,
    updateFactionReputation,
    updateDeck,
    purchaseCard,
    handleGoalInvestment,
    handleGoalActivation
  };
};