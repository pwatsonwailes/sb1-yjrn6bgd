import { Faction } from '../../../types/game';
import { FactionEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

export const generateHostileEvent = (faction: Faction): FactionEvent => ({
  id: generateEventId(),
  type: 'faction',
  message: `${faction.name} issues a hostile warning`,
  timestamp: Date.now(),
  details: {
    factionId: faction.id,
    eventType: 'warning',
    stressChange: 2
  }
});