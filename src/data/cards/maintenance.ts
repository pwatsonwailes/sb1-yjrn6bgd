import { Card } from '../../types/cards';

export const maintenanceCards: Card[] = [
  {
    id: 'quick-repair',
    name: 'Quick Repair',
    type: 'action',
    rarity: 'starter',
    description: 'Perform a quick fix on your mods.',
    flavor: 'A patchwork fix, but it\'ll do for now.',
    cost: { energy: 1, credits: 50 },
    effects: [
      { type: 'condition', value: 10 }
    ]
  },
  {
    id: 'emergency-repairs',
    name: 'Emergency Repairs',
    type: 'action',
    rarity: 'uncommon',
    description: 'Extensive repairs for critical situations.',
    flavor: 'You can\'t afford perfection, but you can\'t afford to fall apart, either.',
    cost: { energy: 2, credits: 150 },
    effects: [
      { type: 'condition', value: 20 }
    ]
  }
];