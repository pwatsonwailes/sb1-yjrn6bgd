import { Goal } from '../../types/goals';

export const megacorpGoals: Goal[] = [
  {
    id: 'megacorp-market-manipulation',
    title: 'Market Manipulation',
    description: 'Influence market prices through strategic investments.',
    factionId: 'megacorp',
    type: 'hybrid',
    difficulty: 'hard',
    requirements: [
      { type: 'credits', amount: 1000 },
      { type: 'energy', amount: 10 }
    ],
    rewards: {
      credits: 2500,
      reputation: 30
    },
    timeLimit: 5,
    status: 'available',
    progress: {
      creditsInvested: 0,
      energyInvested: 0,
      turnsRemaining: 5
    }
  },
  {
    id: 'megacorp-corporate-espionage',
    title: 'Corporate Espionage',
    description: 'Gather intelligence on competitor operations.',
    factionId: 'megacorp',
    type: 'energy',
    difficulty: 'medium',
    requirements: [
      { type: 'energy', amount: 15 }
    ],
    rewards: {
      credits: 800,
      reputation: 20
    },
    timeLimit: 4,
    status: 'available',
    progress: {
      creditsInvested: 0,
      energyInvested: 0,
      turnsRemaining: 4
    }
  }
];