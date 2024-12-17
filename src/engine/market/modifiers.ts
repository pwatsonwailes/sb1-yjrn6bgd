import { MarketModifier, ResourcePrice } from './types';

export const applyModifiers = (price: ResourcePrice): number => {
  let finalPrice = price.base;
  
  // Apply active modifiers
  price.modifiers.forEach(modifier => {
    if (modifier.type === 'multiplier') {
      finalPrice *= (1 + modifier.value);
    } else {
      finalPrice += modifier.value;
    }
  });

  // Apply trend influence
  finalPrice *= (1 + (price.trend * 0.1));
  
  return Math.round(Math.max(finalPrice, 1));
};

export const updateModifiers = (price: ResourcePrice): ResourcePrice => {
  // Remove expired modifiers
  const activeModifiers = price.modifiers.filter(mod => 
    !mod.duration || mod.duration > 0
  );
  
  // Decrease duration of remaining modifiers
  const updatedModifiers = activeModifiers.map(mod => ({
    ...mod,
    duration: mod.duration ? mod.duration - 1 : undefined
  }));

  return {
    ...price,
    modifiers: updatedModifiers
  };
};