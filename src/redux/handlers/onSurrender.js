import Immutable from 'seamless-immutable';
import { getWinnerId, getNextPlayerIdByTurn } from './common';

export const onSurrender = state => {
  const entities = state.entities;
  const currentPlayerId = state.turn;
  const winner = getWinnerId(entities, currentPlayerId);
  const isEnd = Boolean(winner);
  const nextPlayerId = isEnd ? null : getNextPlayerIdByTurn(entities, currentPlayerId);

  return Immutable.merge(state, {
    isEnd,
    winner,
    turn: nextPlayerId,
    entities: {
      ...state.entities,
      [currentPlayerId]: {
        ...state.entities[currentPlayerId],
        isPlaying: false,
      },
    },
  });
};
