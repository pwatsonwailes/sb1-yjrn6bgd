import { Card } from '../../types/cards';

export const modCards: Card[] = [
  {
    id: 'enhanced-reflexes',
    name: 'Enhanced Reflexes',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Gain extra energy this turn.',
    flavor: 'Faster reactions mean faster profits.',
    cost: { energy: 1, credits: 100 },
    effects: [
      { type: 'energy', value: 1 }
    ]
  },
  {
    id: 'repair-drone',
    name: 'Repair Drone',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Automatic repairs each turn.',
    flavor: 'Set it and forget it—until the battery dies.',
    cost: { energy: 0 },
    effects: [
      { type: 'condition', value: 5, duration: -1 }
    ]
  }
];