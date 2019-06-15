import { getWinnerId, getNextPlayerId } from './common';

export const onSurrender = state => {
  const currentPlayerId = state.turn;
  const entities = state.entities;
  const winner = getWinnerId(entities, currentPlayerId);
  const isEnd = Boolean(winner);
  const nextPlayerId = isEnd ? null : getNextPlayerId(entities, currentPlayerId);

  return {
    ...state,
    isEnd,
    winner,
    turn: nextPlayerId,
    entities: Object.assign(
      {},
      state.entities,
      currentPlayerId && {
        [currentPlayerId]: {
          ...state.entities[currentPlayerId],
          isPlaying: false,
        },
      }
    ),
  };
};
