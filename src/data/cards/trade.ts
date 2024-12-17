import { Card } from '../../types/cards';

export const tradeCards: Card[] = [
  {
    id: 'small-trade',
    name: 'Small Trade',
    type: 'action',
    rarity: 'starter',
    description: 'Conduct a small trading operation.',
    flavor: 'There\'s always a market for raw ore—if you know where to sell.',
    cost: { energy: 1 },
    effects: [
      { type: 'credits', value: 150 }
    ]
  },
  {
    id: 'market-opportunity',
    name: 'Market Opportunity',
    type: 'action',
    rarity: 'uncommon',
    description: 'Gain bonus credits if played before a trade card.',
    flavor: 'The market waits for no one.',
    cost: { energy: 1 },
    effects: [
      { type: 'credits', value: 100 }
    ]
  }
];