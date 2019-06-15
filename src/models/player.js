import entity from './entity';
import entities from '../constants/entities';
import { generalSettings } from '../constants/settings';
import { getUuid } from '../utils/numbers';

const playerBase = {
  ...entity,
  type: entities.Player,
  health: generalSettings.maxHealth,
  isPlaying: true,
  user: null,
  cards: [],
  buffer: [],
};

export const createPlayer = (user, options = {}) => ({
  ...playerBase,
  ...options,
  id: getUuid(),
  user,
});

export const switchCardToBuffer = (player, card) => {
  const cards = player.cards;
  const cardIdx = cards.findIndex(c => c.id === card.id);
  if (cardIdx === -1) {
    throw 'Switching cards: invalid move';
  }
  return {
    ...player,
    cards: cards.filter(c => c.id !== card.id),
    buffer: [...player.buffer, card],
  };
};

export const switchFirstCardFromBuffer = player => {
  const [head, ...restBuffer] = player.buffer;
  console.log('FROM BUFFER TO CARD', head);
  return {
    ...player,
    buffer: restBuffer,
    cards: [head, ...player.cards],
  };
};

export const isPlayerHasCard = (player, card) =>
  Boolean(player.cards.find(c => c.type === card.type));
