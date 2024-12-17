import { useState, useCallback } from 'react';
import { Faction } from '../types/factions';
import { ReputationManager } from '../engine/reputation/reputationManager';
import { factions as initialFactions } from '../data/factions/factions';

export const useFactions = () => {
  const [factions, setFactions] = useState<Faction[]>(initialFactions);

  const updateFactionReputation = useCallback((
    factionId: string,
    change: number
  ) => {
    setFactions(currentFactions => {
      const newFactions = [...currentFactions];
      const targetIndex = newFactions.findIndex(f => f.id === factionId);
      
      if (targetIndex === -1) return currentFactions;

      // Update target faction
      const updatedFaction = ReputationManager.updateReputation(
        newFactions[targetIndex],
        change
      );
      newFactions[targetIndex] = updatedFaction;

      // Calculate and apply relationship impacts
      const impacts = ReputationManager.calculateRelationshipImpact(
        newFactions,
        factionId,
        change
      );

      impacts.forEach((impactChange, impactedId) => {
        const impactedIndex = newFactions.findIndex(f => f.id === impactedId);
        if (impactedIndex !== -1) {
          newFactions[impactedIndex] = ReputationManager.updateReputation(
            newFactions[impactedIndex],
            impactChange
          );
        }
      });

      return newFactions;
    });
  }, []);

  return {
    factions,
    updateFactionReputation,
  };
};