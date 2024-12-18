import { Corporation } from '../../../types/game';
import { CorporateEvent } from '../../../types/events';
import { generateEventId } from '../utils/eventUtils';

export const generateAllianceEvent = (corporation: Corporation): CorporateEvent => ({
  id: generateEventId(),
  type: 'corporate',
  message: `${corporation.name} offers a strategic alliance`,
  timestamp: Date.now(),
  details: {
    corporationId: corporation.id,
    eventType: 'opportunity',
    reputationChange: 10,
    creditsChange: 200
  }
});