import { GameState } from '../../types/game';
import { CorporateEvent } from '../../types/events';
import { ReputationManager } from '../reputation/reputationManager';
import { generateAllianceEvent } from './types/allianceEvents';
import { generateHostileEvent } from './types/hostileEvents';
import { checkForOpportunity } from './types/opportunityEvents';
import { checkForConflicts } from './types/conflictEvents';

const ALLIANCE_THRESHOLD = 75;
const HOSTILE_THRESHOLD = -75;

export class CorporateEventManager {
  static checkForCorporateEvents(state: GameState): CorporateEvent[] {
    const events: CorporateEvent[] = [];

    state.corporations.forEach(corporation => {
      // Check for reputation-based events
      if (corporation.reputation >= ALLIANCE_THRESHOLD) {
        events.push(generateAllianceEvent(corporation));
      } else if (corporation.reputation <= HOSTILE_THRESHOLD) {
        events.push(generateHostileEvent(corporation));
      }

      // Check for corporation-specific opportunities
      const opportunity = checkForOpportunity(corporation, state);
      if (opportunity) {
        events.push(opportunity);
      }

      // Check for conflicts between corporations
      const conflicts = checkForConflicts(corporation, state.corporations);
      events.push(...conflicts);
    });

    return events;
  }
}