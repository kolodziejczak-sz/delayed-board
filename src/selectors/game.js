export function getPlayers(state) {
  const arr = (state.game || {}).objects || [];
  return arr.filter(o => o.type === 'PLAYER');
}

export function getPlayer(state, id) {
  return getPlayers(state).filter(p => p.id === id).pop();
}

export function getCurrentPlayer(state) {
  const playerId = state.turn;
  return getPlayer(playerId)
}