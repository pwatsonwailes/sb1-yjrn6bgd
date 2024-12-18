import React, { useState, useMemo } from 'react';
import { Card } from './components/Card';
import { ResourceBar } from './components/ResourceBar';
import { EventLog } from './components/EventLog';
import { FactionPanel } from './components/FactionPanel';
import { DeckManager } from './components/deck/DeckManager';
import { EnergyCounter } from './components/EnergyCounter';
import { useGameState } from './hooks/useGameState';
import { Card as CardType } from './types/cards';
import { allCards } from './data/cards';

export function App() {
  const {
    gameState,
    selectedCards,
    playingCards,
    events,
    factions,
    selectCard,
    endTurn,
    updateDeck,
    purchaseCard
  } = useGameState();

  const [showDeckManager, setShowDeckManager] = useState(false);

  const selectedEnergy = useMemo(() => {
    return gameState.hand
      .filter(card => selectedCards.has(card.id))
      .reduce((total, card) => total + card.cost.energy, 0);
  }, [gameState.hand, selectedCards]);

  const handleCardClick = (card: CardType) => {
    // Don't allow selection if it would exceed available energy
    if (!selectedCards.has(card.id) && 
        selectedEnergy + card.cost.energy > gameState.energyPoints) {
      return;
    }
    selectCard(card);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <ResourceBar
          credits={gameState.credits}
          condition={gameState.condition}
          corporations={gameState.corporations}
          stress={gameState.stress}
          energyPoints={gameState.energyPoints}
          debt={gameState.debt}
        />

        <FactionPanel factions={factions} />

        <div className="flex justify-end">
          <button
            onClick={() => setShowDeckManager(!showDeckManager)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            {showDeckManager ? 'Close Deck Manager' : 'Open Deck Manager'}
          </button>
        </div>

        {showDeckManager ? (
          <DeckManager
            deck={gameState.deck}
            allCards={allCards}
            onUpdateDeck={updateDeck}
            credits={gameState.credits}
            onPurchaseCard={purchaseCard}
          />
        ) : (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">Turn {gameState.turn}</h2>
              {gameState.debtPaymentDue > 0 && (
                <div className="text-red-400">
                  Debt Payment Due in {gameState.debtPaymentDue} turns
                </div>
              )}
            </div>
            
            <div className="flex justify-center mb-4">
              <button
                onClick={endTurn}
                disabled={selectedCards.size === 0}
                className={`
                  px-4 py-2 rounded-lg transition-colors
                  ${selectedCards.size === 0
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }
                  text-white
                `}
              >
                End Turn
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {gameState.hand.map(card => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={() => handleCardClick(card)}
                  disabled={
                    gameState.energyPoints < card.cost.energy ||
                    (card.cost.credits && gameState.credits < card.cost.credits) ||
                    (!selectedCards.has(card.id) && 
                     selectedEnergy + card.cost.energy > gameState.energyPoints)
                  }
                  selected={selectedCards.has(card.id)}
                  playing={playingCards.has(card.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <EventLog events={events} />
      
      <EnergyCounter
        currentEnergy={gameState.energyPoints}
        maxEnergy={gameState.energyPoints}
        selectedEnergy={selectedEnergy}
      />
    </div>
  );
}