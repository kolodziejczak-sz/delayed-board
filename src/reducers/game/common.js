import entities from '../../constants/entities';

export const getPlayers = state =>
  Object.values(state.entities).filter(e => e.type === entities.Player);
export const getActivePlayers = state => getPlayers(state).filter(p => p.isPlaying);

export const getWinnerId = (state, excludePlayerId = null) => {
  const players = getActivePlayers(state).filter(p => p.id !== excludePlayerId);
  const playersAlive = players.filter(p => p.health > 0);
  if (playersAlive.length === 1) {
    return playersAlive[0].id;
  }
  return null;
};

export const getNextPlayerId = state => {
  const players = getActivePlayers(state);
  const currentId = state.turn;
  const idx = players.findIndex(p => p.id === currentId);
  if (idx === -1) {
    return null;
  }
  return players[(idx + 1) % players.length].id;
};
