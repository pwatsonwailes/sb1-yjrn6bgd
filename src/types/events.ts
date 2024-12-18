export type EventType = 'success' | 'warning' | 'danger' | 'info' | 'market' | 'debt' | 'faction' | 'reputation';

export interface GameEvent {
  id: string;
  message: string;
  type: EventType;
  timestamp: number;
  details?: {
    [key: string]: any;
  };
}

export interface MarketEvent extends GameEvent {
  type: 'market';
  details: {
    resource: string;
    oldPrice: number;
    newPrice: number;
    change: number;
  };
}

export interface DebtEvent extends GameEvent {
  type: 'debt';
  details: {
    amount: number;
    turnsUntilDue: number;
  };
}

export interface FactionEvent extends GameEvent {
  type: 'faction';
  details: {
    factionId: string;
    eventType: 'deal' | 'conflict' | 'opportunity' | 'warning';
    reputationChange?: number;
    creditsChange?: number;
    stressChange?: number;
  };
}

export interface ReputationEvent extends GameEvent {
  type: 'reputation';
  details: {
    factionId: string;
    oldReputation: number;
    newReputation: number;
    change: number;
    relatedChanges?: Array<{
      factionId: string;
      change: number;
    }>;
  };
}