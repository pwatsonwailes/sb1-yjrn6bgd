import { Goal } from '../../types/goals';

export const generateGoals = (factionId: string): Goal[] => {
  const baseGoals: Goal[] = [
    {
      id: `${factionId}-market-analysis`,
      title: 'Market Analysis',
      description: 'Analyze market trends for valuable insights.',
      factionId,
      type: 'energy',
      difficulty: 'easy',
      requirements: [
        { type: 'energy', amount: 10 }
      ],
      rewards: {
        credits: 300,
        reputation: 10
      },
      timeLimit: 3,
      status: 'available',
      progress: {
        creditsInvested: 0,
        energyInvested: 0,
        turnsRemaining: 3
      }
    },
    {
      id: `${factionId}-resource-investment`,
      title: 'Resource Investment',
      description: 'Invest credits in promising ventures.',
      factionId,
      type: 'credits',
      difficulty: 'medium',
      requirements: [
        { type: 'credits', amount: 500 }
      ],
      rewards: {
        credits: 1000,
        reputation: 15
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
      id: `${factionId}-strategic-operation`,
      title: 'Strategic Operation',
      description: 'Coordinate a complex operation requiring both resources and energy.',
      factionId,
      type: 'hybrid',
      difficulty: 'hard',
      requirements: [
        { type: 'credits', amount: 800 },
        { type: 'energy', amount: 15 }
      ],
      rewards: {
        credits: 2000,
        reputation: 25,
        cards: ['advanced-mining', 'market-manipulation']
      },
      timeLimit: 7,
      status: 'available',
      progress: {
        creditsInvested: 0,
        energyInvested: 0,
        turnsRemaining: 7
      }
    }
  ];

  return baseGoals.map(goal => ({
    ...goal,
    id: `${goal.id}-${Math.random().toString(36).substr(2, 9)}`
  }));
};