import entities from '../../constants/entities';

export const getPlayers = (ents) => {
  return Object.values(ents).filter(e => e.type === entities.Player);
}

export const getActivePlayers = (ents) => {
  return getPlayers(ents).filter(p => p.isPlaying);
}

export const getWinnerId = (state, excludePlayerId = null) => {
  const players = getActivePlayers(state.entities).filter(p => p.id !== excludePlayerId);
  const playersAlive = players.filter(p => p.health > 0);
  if(playersAlive.length === 1) {
    return playersAlive[0].id;
  }
  return null;
} 

export const calcNextPlayerId = (state) => {
  const players = getActivePlayers(state.entities);
  const currentId = state.turn;
  console.log('CO TO MA BYC', players, currentId)
  const idx = players.findIndex(p => p.id === currentId);
  if(idx === -1) {
    return null;
  }
  return players[(idx + 1) % players.length].id;
}
