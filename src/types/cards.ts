import { Faction } from './factions';

export type CardType = 'action' | 'bodyMod' | 'event' | 'debt' | 'subscription' | 'operation';
export type EffectType = 'credits' | 'condition' | 'reputation' | 'stress' | 'draw' | 'energy';
export type CardRarity = 'starter' | 'common' | 'uncommon' | 'rare';

export interface CardEffect {
  type: EffectType;
  value: number;
  chance?: number;
  duration?: number;
  factionId?: string;
}

export interface CardProgress {
  turnsRequired: number;
  turnsSpent: number;
  energyInvested: number;
  creditsInvested: number;
}

export interface CardPenalty {
  type: EffectType;
  value: number;
  percentage?: boolean;
}

export interface CardCost {
  energy: number;
  credits?: number;
  turns?: number; // Number of turns required to complete
  perTurn?: {
    energy?: number;
    credits?: number;
  };
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
  penalty?: CardPenalty;
  image?: string;
  progress?: CardProgress;
}