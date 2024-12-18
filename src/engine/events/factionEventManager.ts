import { GameState } from '../../types/game';
import { FactionEvent } from '../../types/events';
import { generateAllianceEvent } from './types/allianceEvents';
import { generateHostileEvent } from './types/hostileEvents';
import { checkForOpportunity } from './types/opportunityEvents';
import { checkForConflicts } from './types/conflictEvents';

const ALLIANCE_THRESHOLD = 75;
const HOSTILE_THRESHOLD = -75;

export class FactionEventManager {
  static checkForFactionEvents(state: GameState): FactionEvent[] {
    const events: FactionEvent[] = [];

    state.factions.forEach(faction => {
      // Check for reputation-based events
      if (faction.reputation >= ALLIANCE_THRESHOLD) {
        events.push(generateAllianceEvent(faction));
      } else if (faction.reputation <= HOSTILE_THRESHOLD) {
        events.push(generateHostileEvent(faction));
      }

      // Check for faction-specific opportunities
      const opportunity = checkForOpportunity(faction);
      if (opportunity) {
        events.push(opportunity);
      }

      // Check for conflicts between factions
      const conflicts = checkForConflicts(faction, state.factions);
      events.push(...conflicts);
    });

    return events;
  }
}