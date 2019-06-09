import { getWinnerId, calcNextPlayerId } from './helpers';

export const onSurrender = (state) => {
  const currentPlayerId = state.turn;
  const winner = getWinnerId(state, currentPlayerId);
  const isEnd = Boolean(winner);
  const nextPlayerId = isEnd ? null : calcNextPlayerId(state);
  return {
    ...state,
    isEnd,
    winner,
    turn: nextPlayerId,
    entities: {
      ...state.entities,
      [currentPlayerId]: {
        ...state.entities[currentPlayerId],
        isPlaying: false
      }
    }
  }
};