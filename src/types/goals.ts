export type GoalStatus = 'available' | 'active' | 'completed' | 'failed';
export type GoalType = 'credits' | 'energy' | 'hybrid';
export type GoalDifficulty = 'easy' | 'medium' | 'hard';

export interface GoalProgress {
  creditsInvested: number;
  energyInvested: number;
  turnsRemaining: number;
}

export interface GoalRequirement {
  type: 'credits' | 'energy';
  amount: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  factionId: string;
  type: GoalType;
  difficulty: GoalDifficulty;
  requirements: GoalRequirement[];
  rewards: {
    credits?: number;
    reputation?: number;
    cards?: string[];
  };
  timeLimit: number;
  status: GoalStatus;
  progress: GoalProgress;
}