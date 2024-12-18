import { useState, useCallback } from 'react';
import { TutorialState, TutorialStep, TUTORIAL_STEPS } from '../types/tutorial';

export const useTutorial = () => {
  const [tutorialState, setTutorialState] = useState<TutorialState>({
    isActive: true,
    currentStepIndex: 0,
    completedSteps: new Set()
  });

  const getCurrentStep = useCallback((): TutorialStep | null => {
    if (!tutorialState.isActive || tutorialState.currentStepIndex >= TUTORIAL_STEPS.length) {
      return null;
    }
    return TUTORIAL_STEPS[tutorialState.currentStepIndex];
  }, [tutorialState.isActive, tutorialState.currentStepIndex]);

  const completeStep = useCallback((stepId: string) => {
    setTutorialState(prev => {
      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(stepId);

      return {
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1,
        completedSteps: newCompleted,
        isActive: prev.currentStepIndex + 1 < TUTORIAL_STEPS.length
      };
    });
  }, []);

  const skipTutorial = useCallback(() => {
    setTutorialState(prev => ({
      ...prev,
      isActive: false
    }));
  }, []);

  return {
    tutorialState,
    getCurrentStep,
    completeStep,
    skipTutorial
  };
};