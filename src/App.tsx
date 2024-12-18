import { useState, useMemo } from 'react';
import { ResourceBar } from './components/ResourceBar';
import { EventLog } from './components/EventLog';
import { FactionsView } from './components/views/FactionsView';
import { BoardView } from './components/views/BoardView';
import { DeckManager } from './components/deck/DeckManager';
import { EnergyCounter } from './components/EnergyCounter';
import { ViewSelector, ViewType } from './components/navigation/ViewSelector';
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

  const [currentView, setCurrentView] = useState<ViewType>('board');

  const selectedEnergy = useMemo(() => {
    return gameState.hand
      .filter(card => selectedCards.has(card.id))
      .reduce((total, card) => total + card.cost.energy, 0);
  }, [gameState.hand, selectedCards]);

  const handleCardClick = (card: CardType) => {
    if (!selectedCards.has(card.id) && 
        selectedEnergy + card.cost.energy > gameState.energyPoints) {
      return;
    }
    selectCard(card);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'board':
        return (
          <BoardView
            turn={gameState.turn}
            debtPaymentDue={gameState.debtPaymentDue}
            hand={gameState.hand}
            energyPoints={gameState.energyPoints}
            credits={gameState.credits}
            selectedCards={selectedCards}
            playingCards={playingCards}
            selectedEnergy={selectedEnergy}
            onCardClick={handleCardClick}
            onEndTurn={endTurn}
          />
        );
      case 'factions':
        return (
          <FactionsView
            factions={factions}
            credits={gameState.credits}
            onPurchaseCard={purchaseCard}
            gameState={gameState}
          />
        );
      case 'deck':
        return (
          <DeckManager
            deck={gameState.deck}
            allCards={allCards}
            onUpdateDeck={updateDeck}
            credits={gameState.credits}
            onPurchaseCard={purchaseCard}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <ResourceBar
          credits={gameState.credits}
          condition={gameState.condition}
          factions={gameState.factions}
          stress={gameState.stress}
          energyPoints={gameState.energyPoints}
          debt={gameState.debt}
        />

        <div className="flex justify-center mb-4">
          <ViewSelector
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>

        {renderCurrentView()}
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