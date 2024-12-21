import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Zap, Users, CreditCard } from 'lucide-react';
import { factions } from '../../data/factions';

interface IntroScreenProps {
  onStartGame: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <CircuitBoard className="w-16 h-16 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cyber Syndicate</h1>
          <p className="text-xl text-gray-400">
            Navigate the corporate underworld, build your deck, and rise to power
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Strategic Gameplay</h3>
            <p className="text-gray-400">
              Build your deck, manage resources, and make tactical decisions each turn
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <Users className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Corporate Politics</h3>
            <p className="text-gray-400">
              Navigate relationships with powerful factions and forge alliances
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <CreditCard className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Economic Strategy</h3>
            <p className="text-gray-400">
              Manage credits, debt, and market opportunities to build your empire
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={onStartGame}
            className="
              px-8 py-3 bg-indigo-600 hover:bg-indigo-700
              rounded-lg text-lg font-semibold
              transition-colors duration-200
              shadow-lg hover:shadow-xl
              transform hover:-translate-y-1
            "
          >
            Start Game
          </button>
        </motion.div>
      </div>
    </div>
  );
};