import { useState, useMemo } from 'react';

import { ResourceBar } from './components/ResourceBar';
import { EventLog } from './components/EventLog';
import { FactionsView } from './components/views/FactionsView';
import { BoardView } from './components/views/BoardView';
import { DeckManager } from './components/deck/DeckManager';
import { EnergyCounter } from './components/EnergyCounter';
import { ViewSelector, ViewType } from './components/navigation/ViewSelector';
import { IntroScreen } from './components/intro/IntroScreen';
import { StoryView } from './components/story/StoryView';
import { TutorialOverlay } from './components/tutorial/TutorialOverlay';
import { TutorialHighlight } from './components/tutorial/TutorialHighlight';
import { GoalsView } from './components/goals/GoalsView';

import { Card as CardType } from './types/cards';

import { allCards } from './data/cards';
import { storyChapters } from './data/story/chapters';

import { useTutorial } from './hooks/useTutorial';
import { useGameState } from './hooks/useGameState';
import { useStory } from './hooks/useStory';
import { useSaveState } from './hooks/useSaveState';

export function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('board');
  const { tutorialState, getCurrentStep, completeStep, skipTutorial } = useTutorial();

  const { saveState } = useSaveState();
  const { gameState, ...gameActions } = useGameState(saveState);
  const { storyState, ...storyActions } = useStory(storyChapters, saveState);

  const selectedEnergy = useMemo(() => {
    return gameState.hand
      .filter(card => selectedCards.has(card.id))
      .reduce((total, card) => total + card.cost.energy, 0);
  }, [gameState.hand, selectedCards]);

  // Update card click handler
  const handleCardClick = (card: CardType) => {
    if (!selectedCards.has(card.id) && 
        selectedEnergy + card.cost.energy > gameState.energyPoints) {
      return;
    }
    
    selectCard(card);
    
    // Check if this completes a tutorial step
    const currentStep = getCurrentStep();
    if (currentStep?.action?.type === 'select-card') {
      completeStep(currentStep.id);
    }
  };

  if (!gameStarted) {
    return <IntroScreen onStartGame={() => setGameStarted(true)} />;
  }

  if (storyState.isPlaying) {
    return (
      <StoryView
        storyState={storyState}
        getCurrentNode={getCurrentNode}
        onChoice={handleChoice}
        onNext={handleNext}
        onComplete={handleComplete}
      />
    );
  }

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
      case 'goals':
        return (
          <GoalsView
            goals={gameState.goals}
            onActivateGoal={handleGoalActivation}
            onInvestInGoal={handleGoalInvestment}
            credits={gameState.credits}
            energy={gameState.energyPoints}
            factions={factions}
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

      {tutorialState.isActive && getCurrentStep() && (
        <>
          <TutorialOverlay
            step={getCurrentStep()!}
            onComplete={completeStep}
            onSkip={skipTutorial}
          />
          {getCurrentStep()?.highlight && (
            <TutorialHighlight selector={getCurrentStep()!.highlight!} />
          )}
        </>
      )}
    </div>
  );
}