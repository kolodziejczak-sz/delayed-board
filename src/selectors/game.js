import entities from '../constants/entities';

export function getPlayers(state) {
  const arr = Object.values(state.game.entities);
  return arr.filter(e => e.type === entities.Player);
}

export function getPlayer(state, id) {
  return state.game.entities[id];
}

export function getCurrentPlayer(state) {
  const playerId = state.game.turn;
  return getPlayer(state, playerId);
}

export function getWinnerPlayer(state) {
  return getPlayer(state, state.game.winner);
}

export function isGameEnd(state) {
  return state.game.isEnd;
}
