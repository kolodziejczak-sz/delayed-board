import {
  addIndex,
  map,
  compose,
  filter,
  where,
  equals,
  T,
  values,
  gt,
  __,
  reject,
  reduce,
  mergeRight,
  prop,
} from 'ramda';
import entity from './entity';
import entities from '../constants/entities';
import { generalSettings, deckComponents } from '../constants/settings';
import { createRandomPosition } from './position';
import { createDeck } from './card';
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

export const createPlayerEntities = (boardSize, users) =>
  compose(
    getPlayersAsObject,
    addIndex(map)((user, idx) =>
      createPlayer(user, {
        cards: createDeck(deckComponents),
        position: createRandomPosition(0, boardSize - 1, idx * 5, idx * 5 + 2),
      })
    )
  )(users);

export const getActivePlayers = entitiesObj =>
  filter(where({ isPlaying: equals(T()) }), getPlayers(entitiesObj));

export const getPlayers = entitiesObj =>
  filter(where({ type: equals(entities.Player) }), values(entitiesObj));

export const getPlayersAlive = filter(where({ health: gt(__, 0) }));

export const getPlayersWithoutPlayerWithId = playerId =>
  reject(where({ id: equals(playerId) }));

export const getPlayersAsObject = players =>
  reduce((acc, obj) => mergeRight(acc, { [prop('id', obj)]: obj }), {}, players);

// TODO: move out from here
export const getPlayerWithCardMovedToBuffer = (player, card) => {
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

// TODO: move out from here
export const getPlayerWithFirstCardMovedFromBufferToCards = player => {
  const [head, ...restBuffer] = player.buffer;

  return {
    ...player,
    buffer: restBuffer,
    cards: [head, ...player.cards],
  };
};

export const doesPlayerHaveCard = (player, card) =>
  Boolean(player.cards.find(c => c.type === card.type));
