import { Faction } from '../../types/factions';

export const factions: Faction[] = [
  {
    id: 'megacorp',
    name: 'MegaCorp Industries',
    description: 'Global leader in cybernetic enhancements',
    reputation: 0,
    traits: [
      {
        id: 'corporate-efficiency',
        name: 'Corporate Efficiency',
        description: 'Reduced market transaction fees',
        effect: { type: 'market', modifier: -0.1 }
      }
    ],
    relationships: {
      'cybertech': 0.5,
      'quantum': 0.3,
      'stellarcorp': -0.2
    }
  },
  {
    id: 'cybertech',
    name: 'CyberTech Solutions',
    description: 'Cutting-edge neural interface specialists',
    reputation: 0,
    traits: [
      {
        id: 'tech-innovation',
        name: 'Tech Innovation',
        description: 'Better prices on cybernetic upgrades',
        effect: { type: 'resource', modifier: 0.15 }
      }
    ],
    relationships: {
      'megacorp': 0.5,
      'quantum': 0.4,
      'stellarcorp': 0.1
    }
  },
  {
    id: 'quantum',
    name: 'Quantum Dynamics',
    description: 'Pioneers in quantum computing and AI',
    reputation: 0,
    traits: [
      {
        id: 'quantum-expertise',
        name: 'Quantum Expertise',
        description: 'Enhanced data mining capabilities',
        effect: { type: 'resource', modifier: 0.2 }
      }
    ],
    relationships: {
      'megacorp': 0.3,
      'cybertech': 0.4,
      'stellarcorp': -0.3
    }
  },
  {
    id: 'stellarcorp',
    name: 'StellarCorp Mining',
    description: 'Deep space mining and resource extraction',
    reputation: 0,
    traits: [
      {
        id: 'mining-expertise',
        name: 'Mining Expertise',
        description: 'Improved mining operation yields',
        effect: { type: 'resource', modifier: 0.25 }
      }
    ],
    relationships: {
      'megacorp': -0.2,
      'cybertech': 0.1,
      'quantum': -0.3
    }
  }
];