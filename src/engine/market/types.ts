export interface MarketModifier {
    type: 'multiplier' | 'flat';
    value: number;
    source: string;
    duration?: number;
  }
  
  export interface ResourcePrice {
    base: number;
    current: number;
    volatility: number;
    trend: number; // -1 to 1, indicating market trend
    modifiers: MarketModifier[];
  }
  
  export interface MarketTrend {
    direction: 'up' | 'down' | 'stable';
    strength: number; // 0 to 1
    duration: number; // turns remaining
  }
  
  export interface MarketState {
    resourcePrices: Record<string, ResourcePrice>;
    globalModifier: number;
    trends: Record<string, MarketTrend>;
    lastUpdate: number;
  }