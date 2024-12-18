import { useState, useCallback } from 'react';
import { GameEvent } from '../types/events';

export const useEvents = () => {
  const [events, setEvents] = useState<GameEvent[]>([]);

  const addEvent = useCallback((event: Omit<GameEvent, 'id' | 'timestamp'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };

    setEvents(current => [...current, newEvent]);

    // Remove event after delay based on type
    setTimeout(() => {
      setEvents(current => current.filter(e => e.id !== newEvent.id));
    }, event.type === 'market' ? 5000 : 3000);
  }, []);

  return { events, addEvent };
};