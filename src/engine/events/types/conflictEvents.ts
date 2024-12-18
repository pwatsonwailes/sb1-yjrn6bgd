import { Faction } from '../../../types/game';
import { FactionEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

const REPUTATION_THRESHOLD = 50;

export const checkForConflicts = (faction: Faction, factions: Faction[]): FactionEvent[] => {
  const conflicts: FactionEvent[] = [];
  
  factions.forEach(otherCorp => {
    if (faction.id === otherCorp.id) return;
    
    if (faction.reputation > REPUTATION_THRESHOLD && otherCorp.reputation < -REPUTATION_THRESHOLD) {
      conflicts.push({
        id: generateEventId(),
        type: 'faction',
        message: `Conflict erupts between ${faction.name} and ${otherCorp.name}`,
        timestamp: Date.now(),
        details: {
          factionId: faction.id,
          eventType: 'conflict',
          reputationChange: -5,
          stressChange: 1
        }
      });
    }
  });
  
  return conflicts;
};