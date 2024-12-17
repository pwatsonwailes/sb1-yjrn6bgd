import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GameEvent {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

interface EventLogProps {
  events: GameEvent[];
}

export const EventLog: React.FC<EventLogProps> = ({ events }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full space-y-2 z-50">
      <AnimatePresence>
        {events.map(event => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg shadow-lg ${
              event.type === 'success' ? 'bg-green-600' :
              event.type === 'warning' ? 'bg-yellow-600' :
              event.type === 'danger' ? 'bg-red-600' :
              'bg-blue-600'
            } text-white`}
          >
            {event.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};