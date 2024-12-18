import React from 'react';
import { Card } from '../../types/cards';
import { DeckCard } from './DeckCard';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface DeckListProps {
  deck: Card[];
  availableCards: Card[];
  onUpdateDeck: (newDeck: Card[]) => void;
  onPurchaseCard: (card: Card, cost: number) => void;
  calculateCardCost: (card: Card) => number;
  credits: number;
}

export const DeckList: React.FC<DeckListProps> = ({
  deck,
  availableCards,
  onUpdateDeck,
  onPurchaseCard,
  calculateCardCost,
  credits
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(deck);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onUpdateDeck(items);
  };

  // Group cards by their base ID (without the unique suffix)
  const groupedDeck = deck.reduce((acc, card) => {
    const baseId = card.id.split('-')[0];
    if (!acc[baseId]) {
      acc[baseId] = {
        card,
        count: 1
      };
    } else {
      acc[baseId].count++;
    }
    return acc;
  }, {} as Record<string, { card: Card; count: number }>);

  const removeCard = (cardToRemove: Card) => {
    const baseId = cardToRemove.id.split('-')[0];
    const newDeck = [...deck];
    const indexToRemove = newDeck.findIndex(card => card.id.split('-')[0] === baseId);
    if (indexToRemove !== -1) {
      newDeck.splice(indexToRemove, 1);
      onUpdateDeck(newDeck);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Current Deck ({deck.length})</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="deck">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {Object.entries(groupedDeck).map(([baseId, { card, count }], index) => (
                  <Draggable key={baseId} draggableId={baseId} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DeckCard
                          card={card}
                          count={count}
                          onRemove={() => removeCard(card)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Available Cards</h3>
        <div className="space-y-2">
          {availableCards.map(card => {
            const cost = calculateCardCost(card);
            const canAfford = credits >= cost;
            const currentCount = groupedDeck[card.id.split('-')[0]]?.count || 0;
            const maxCards = 3; // Maximum copies of a card allowed in deck
            
            return (
              <DeckCard
                key={card.id}
                card={card}
                cost={cost}
                count={currentCount}
                onAdd={() => {
                  if (deck.length < 30 && canAfford && currentCount < maxCards) {
                    onPurchaseCard(card, cost);
                  }
                }}
                disabled={deck.length >= 30 || !canAfford || currentCount >= maxCards}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};