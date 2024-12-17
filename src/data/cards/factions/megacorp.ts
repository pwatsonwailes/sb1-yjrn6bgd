import { Card } from '../../../types/cards';

export const megacorpCards: Card[] = [
  {
    id: 'corporate-deal',
    name: 'Corporate Deal',
    type: 'action',
    rarity: 'uncommon',
    description: 'Leverage MegaCorp connections for a profitable trade.',
    flavor: 'In corporate space, everything has a price tag.',
    cost: { energy: 2, credits: 100 },
    effects: [
      { type: 'credits', value: 300 },
      { type: 'reputation', value: 10, factionId: 'megacorp' }
    ]
  },
  {
    id: 'hostile-takeover',
    name: 'Hostile Takeover',
    type: 'action',
    rarity: 'rare',
    description: 'Assist MegaCorp in acquiring a smaller company.',
    flavor: 'Business is war by other means.',
    cost: { energy: 3 },
    effects: [
      { type: 'credits', value: 500 },
      { type: 'reputation', value: 15, factionId: 'megacorp' },
      { type: 'reputation', value: -20, factionId: 'cybertech' }
    ]
  },
  {
    id: 'corporate-espionage',
    name: 'Corporate Espionage',
    type: 'action',
    rarity: 'rare',
    description: 'Steal valuable data for MegaCorp.',
    flavor: 'Information is the most valuable currency.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 400 },
      { type: 'reputation', value: 20, factionId: 'megacorp' },
      { type: 'stress', value: 2 }
    ]
  },
  {
    id: 'market-manipulation',
    name: 'Market Manipulation',
    type: 'action',
    rarity: 'uncommon',
    description: 'Use insider information to play the market.',
    flavor: 'The invisible hand belongs to MegaCorp.',
    cost: { energy: 2, credits: 200 },
    effects: [
      { type: 'credits', value: 400 },
      { type: 'reputation', value: 5, factionId: 'megacorp' }
    ]
  },
  {
    id: 'corporate-protection',
    name: 'Corporate Protection',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install MegaCorp security protocols.',
    flavor: 'Safety guaranteed, terms and conditions apply.',
    cost: { energy: 1, credits: 300 },
    effects: [
      { type: 'condition', value: 20 },
      { type: 'reputation', value: 10, factionId: 'megacorp' }
    ]
  }
];