import { Corporation } from '../../../types/game';
import { CorporateEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

export const generateHostileEvent = (corporation: Corporation): CorporateEvent => ({
  id: generateEventId(),
  type: 'corporate',
  message: `${corporation.name} issues a hostile warning`,
  timestamp: Date.now(),
  details: {
    corporationId: corporation.id,
    eventType: 'warning',
    stressChange: 2
  }
});