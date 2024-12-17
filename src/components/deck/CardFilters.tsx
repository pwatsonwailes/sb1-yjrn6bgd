import React from 'react';
import { Search } from 'lucide-react';

interface CardFiltersProps {
  filters: {
    type: string;
    faction: string;
    rarity: string;
    search: string;
  };
  onUpdateFilters: (filters: any) => void;
}

export const CardFilters: React.FC<CardFiltersProps> = ({
  filters,
  onUpdateFilters,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search cards..."
          value={filters.search}
          onChange={(e) => onUpdateFilters({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <select
        value={filters.type}
        onChange={(e) => onUpdateFilters({ ...filters, type: e.target.value })}
        className="bg-gray-800 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Types</option>
        <option value="action">Action</option>
        <option value="bodyMod">Body Mod</option>
        <option value="event">Event</option>
        <option value="debt">Debt</option>
      </select>

      <select
        value={filters.faction}
        onChange={(e) => onUpdateFilters({ ...filters, faction: e.target.value })}
        className="bg-gray-800 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Factions</option>
        <option value="megacorp">MegaCorp</option>
        <option value="cybertech">CyberTech</option>
        <option value="quantum">Quantum</option>
        <option value="stellarcorp">StellarCorp</option>
      </select>

      <select
        value={filters.rarity}
        onChange={(e) => onUpdateFilters({ ...filters, rarity: e.target.value })}
        className="bg-gray-800 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Rarities</option>
        <option value="starter">Starter</option>
        <option value="common">Common</option>
        <option value="uncommon">Uncommon</option>
        <option value="rare">Rare</option>
      </select>
    </div>
  );
};