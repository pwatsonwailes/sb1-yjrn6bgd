import { useState, useCallback } from 'react';
import { Goal, GoalStatus } from '../types/goals';
import { generateGoals } from '../data/goals';

export const useGoals = (factions: string[]) => {
  const [goals, setGoals] = useState<Goal[]>(() => 
    factions.flatMap(factionId => generateGoals(factionId))
  );

  const investInGoal = useCallback((
    goalId: string,
    type: 'credits' | 'energy',
    amount: number
  ) => {
    setGoals(currentGoals => 
      currentGoals.map(goal => {
        if (goal.id !== goalId) return goal;

        const newProgress = {
          ...goal.progress,
          [`${type}Invested`]: goal.progress[`${type}Invested`] + amount
        };

        // Check if goal is completed
        const isCompleted = goal.requirements.every(req => 
          newProgress[`${req.type}Invested`] >= req.amount
        );

        return {
          ...goal,
          progress: newProgress,
          status: isCompleted ? 'completed' : goal.status
        };
      })
    );
  }, []);

  const updateGoalTimers = useCallback(() => {
    setGoals(currentGoals =>
      currentGoals.map(goal => {
        if (goal.status !== 'active') return goal;

        const turnsRemaining = goal.progress.turnsRemaining - 1;
        
        return {
          ...goal,
          progress: {
            ...goal.progress,
            turnsRemaining
          },
          status: turnsRemaining <= 0 ? 'failed' : goal.status
        };
      })
    );
  }, []);

  const activateGoal = useCallback((goalId: string) => {
    setGoals(currentGoals =>
      currentGoals.map(goal =>
        goal.id === goalId
          ? { ...goal, status: 'active' }
          : goal
      )
    );
  }, []);

  return {
    goals,
    investInGoal,
    updateGoalTimers,
    activateGoal
  };
};