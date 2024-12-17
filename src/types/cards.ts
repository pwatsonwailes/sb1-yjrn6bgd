export type CardType = 'action' | 'bodyMod' | 'event' | 'debt' | 'subscription';
export type EffectType = 'credits' | 'condition' | 'reputation' | 'stress' | 'draw' | 'energy';
export type CardRarity = 'starter' | 'common' | 'uncommon' | 'rare';

export interface CardEffect {
  type: EffectType;
  value: number;
  chance?: number;
  duration?: number;
  corporationId?: string;
}

export interface CardCost {
  energy: number;
  credits?: number;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;
  description: string;
  flavor: string;
  cost: CardCost;
  effects: CardEffect[];
  mandatory?: boolean;
  image?: string;
}