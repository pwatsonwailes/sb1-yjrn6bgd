import { Faction } from '../../../types/game';
import { FactionEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

const OPPORTUNITY_THRESHOLD = 0.8;

interface OpportunityConfig {
  message: string;
  eventType: 'deal' | 'opportunity';
  creditsChange?: number;
  reputationChange?: number;
}

const FACTION_OPPORTUNITIES: Record<string, OpportunityConfig> = {
  megacorp: {
    message: 'MegaCorp offers a lucrative business deal',
    eventType: 'deal',
    creditsChange: 300,
    reputationChange: 5
  },
  cybertech: {
    message: 'CyberTech proposes a technology exchange',
    eventType: 'opportunity',
    reputationChange: 8
  },
  quantum: {
    message: 'Quantum Dynamics shares market predictions',
    eventType: 'opportunity',
    creditsChange: 150
  },
  stellarcorp: {
    message: 'StellarCorp reveals a rich mining location',
    eventType: 'opportunity',
    creditsChange: 250
  }
};

export const checkForOpportunity = (faction: Faction): FactionEvent | null => {
  if (Math.random() <= OPPORTUNITY_THRESHOLD) return null;

  const config = FACTION_OPPORTUNITIES[faction.id];
  if (!config) return null;

  return {
    id: generateEventId(),
    type: 'faction',
    message: config.message,
    timestamp: Date.now(),
    details: {
      factionId: faction.id,
      eventType: config.eventType,
      ...(config.creditsChange && { creditsChange: config.creditsChange }),
      ...(config.reputationChange && { reputationChange: config.reputationChange })
    }
  };
};