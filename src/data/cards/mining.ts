import { Card } from '../../types/cards';

export const miningCards: Card[] = [
  {
    id: 'basic-mining',
    name: 'Basic Mining',
    type: 'action',
    rarity: 'starter',
    description: 'Mine a small asteroid for resources.',
    flavor: 'Asteroids don\'t mine themselves—time to get your hands dirty.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 100 },
      { type: 'condition', value: -5, chance: 0.33 }
    ]
  },
  {
    id: 'risky-mining',
    name: 'Risky Mining',
    type: 'action',
    rarity: 'uncommon',
    description: 'Mine a dangerous asteroid for high rewards.',
    flavor: 'Big rewards demand big risks.',
    cost: { energy: 3 },
    effects: [
      { type: 'credits', value: 300 },
      { type: 'condition', value: -20, chance: 0.5 }
    ]
  },
  {
    id: 'efficient-mining',
    name: 'Efficient Mining',
    type: 'action',
    rarity: 'rare',
    description: 'Mine with precision equipment.',
    flavor: 'With the right equipment, efficiency is profit.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 200 },
      { type: 'condition', value: -10, chance: 0.1 }
    ]
  }
];