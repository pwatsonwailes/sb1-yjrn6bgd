import { Corporation } from '../../../types/game';
import { CorporateEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

const REPUTATION_THRESHOLD = 50;

export const checkForConflicts = (corporation: Corporation, corporations: Corporation[]): CorporateEvent[] => {
  const conflicts: CorporateEvent[] = [];
  
  corporations.forEach(otherCorp => {
    if (corporation.id === otherCorp.id) return;
    
    if (corporation.reputation > REPUTATION_THRESHOLD && otherCorp.reputation < -REPUTATION_THRESHOLD) {
      conflicts.push({
        id: generateEventId(),
        type: 'corporate',
        message: `Conflict erupts between ${corporation.name} and ${otherCorp.name}`,
        timestamp: Date.now(),
        details: {
          corporationId: corporation.id,
          eventType: 'conflict',
          reputationChange: -5,
          stressChange: 1
        }
      });
    }
  });
  
  return conflicts;
};