import Immutable from 'seamless-immutable';
import { getWinnerId, getNextPlayerIdByTurn } from './common';

export const onSurrender = state => {
  const currentPlayerId = state.turn;
  const entities = state.entities;
  const winner = getWinnerId(entities, currentPlayerId);
  const isEnd = Boolean(winner);
  const nextPlayerId = isEnd ? null : getNextPlayerIdByTurn(entities, currentPlayerId);

  return Immutable.merge(state, {
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
  });
};
