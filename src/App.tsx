import React from 'react';
import { Card } from './components/Card';
import { ResourceBar } from './components/ResourceBar';
import { EventLog } from './components/EventLog';
import { useGameState } from './hooks/useGameState';
import { Card as CardType } from './types/cards';

export function App() {
  const { gameState, selectedCards, playingCards, events, selectCard, endTurn } = useGameState();

  const handleCardClick = (card: CardType) => {
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
                  (card.cost.credits && gameState.credits < card.cost.credits)
                }
                selected={selectedCards.has(card.id)}
                playing={playingCards.has(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <EventLog events={events} />
    </div>
  );
}

export default App;