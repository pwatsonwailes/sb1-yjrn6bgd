import { Card } from '../../../types/cards';

export const cybertechCards: Card[] = [
  {
    id: 'neural-upgrade',
    name: 'Neural Upgrade',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install cutting-edge neural enhancements.',
    flavor: 'Your mind is the only limit.',
    cost: { energy: 2, credits: 400 },
    effects: [
      { type: 'energy', value: 1 },
      { type: 'reputation', value: 15, factionId: 'cybertech' }
    ]
  },
  {
    id: 'beta-testing',
    name: 'Beta Testing',
    type: 'action',
    rarity: 'uncommon',
    description: 'Test experimental CyberTech upgrades.',
    flavor: 'Be the first to try the future.',
    cost: { energy: 1 },
    effects: [
      { type: 'credits', value: 200 },
      { type: 'reputation', value: 10, factionId: 'cybertech' },
      { type: 'condition', value: -10, chance: 0.3 }
    ]
  },
  {
    id: 'tech-salvage',
    name: 'Tech Salvage',
    type: 'action',
    rarity: 'uncommon',
    description: 'Recover and resell CyberTech components.',
    flavor: 'One corp\'s trash is another\'s treasure.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 250 },
      { type: 'reputation', value: 5, factionId: 'cybertech' }
    ]
  },
  {
    id: 'neural-optimization',
    name: 'Neural Optimization',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Fine-tune neural pathways for enhanced performance.',
    flavor: 'Think faster, work better.',
    cost: { energy: 3, credits: 300 },
    effects: [
      { type: 'energy', value: 2 },
      { type: 'reputation', value: 10, factionId: 'cybertech' },
      { type: 'stress', value: 1 }
    ]
  },
  {
    id: 'prototype-install',
    name: 'Prototype Install',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install experimental CyberTech prototype.',
    flavor: 'The bleeding edge cuts both ways.',
    cost: { energy: 2, credits: 500 },
    effects: [
      { type: 'condition', value: 30 },
      { type: 'reputation', value: 20, factionId: 'cybertech' },
      { type: 'stress', value: 2 }
    ]
  }
];