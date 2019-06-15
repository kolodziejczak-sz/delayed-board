import entities from '../../constants/entities';

export const getActivePlayers = entitiesObj =>
  getPlayers(entitiesObj).filter(p => p.isPlaying);

export const getPlayers = entitiesObj =>
  Object.values(entitiesObj).filter(e => e.type === entities.Player);

export const getWinnerId = (entitiesObj, excludePlayerId = null) => {
  const players = getActivePlayers(entitiesObj).filter(p => p.id !== excludePlayerId);
  const playersAlive = players.filter(p => p.health > 0);
  if (playersAlive.length === 1) {
    return playersAlive[0].id;
  }
  return null;
};

export const getNextPlayerId = (entitiesObj, currentTurn) => {
  const players = getActivePlayers(entitiesObj);
  const idx = players.findIndex(p => p.id === currentTurn);
  if (idx === -1) {
    return null;
  }
  return players[(idx + 1) % players.length].id;
};

export const playersToObject = players =>
  players.reduce((acc, e) => ((acc[e.id] = e), acc), {});
