import { Card } from '../types/game';

export const initialDeck: Card[] = [
  {
    id: 'basic-mining-1',
    name: 'Basic Mining',
    type: 'action',
    description: 'Mine a small asteroid for resources.',
    energyCost: 2,
    effects: [
      { type: 'credits', value: 100, chance: 0.8 },
      { type: 'condition', value: -10, chance: 0.2 }
    ]
  },
  {
    id: 'basic-trade-1',
    name: 'Trade Run',
    type: 'action',
    description: 'Conduct a simple trade operation.',
    energyCost: 1,
    effects: [
      { type: 'credits', value: 50 }
    ]
  },
  {
    id: 'basic-repair-1',
    name: 'Basic Repair',
    type: 'action',
    description: 'Perform basic maintenance on your mods.',
    energyCost: 1,
    effects: [
      { type: 'condition', value: 20 }
    ]
  }
];