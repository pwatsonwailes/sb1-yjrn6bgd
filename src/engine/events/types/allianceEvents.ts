import { Faction } from '../../../types/game';
import { FactionEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

export const generateAllianceEvent = (faction: Faction): FactionEvent => ({
  id: generateEventId(),
  type: 'faction',
  message: `${faction.name} offers a strategic alliance`,
  timestamp: Date.now(),
  details: {
    factionId: faction.id,
    eventType: 'opportunity',
    reputationChange: 10,
    creditsChange: 200
  }
});