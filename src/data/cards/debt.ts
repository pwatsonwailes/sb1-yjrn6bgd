import { Card } from '../../types/cards';

export const debtCards: Card[] = [
  {
    id: 'subscription-payment',
    name: 'Subscription Payment',
    type: 'subscription',
    rarity: 'starter',
    description: 'Pay your mod subscription fees.',
    flavor: 'The fine print doesn\'t care if you\'re broke.',
    cost: { energy: 0, credits: 200 },
    mandatory: true,
    effects: [
      { type: 'condition', value: -20 }
    ]
  },
  {
    id: 'take-loan',
    name: 'Take Loan',
    type: 'debt',
    rarity: 'starter',
    description: 'Get quick credits, but add debt to your future.',
    flavor: 'Desperation makes for bad deals.',
    cost: { energy: 0 },
    effects: [
      { type: 'credits', value: 500 }
    ]
  }
];