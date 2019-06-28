import entities from '../../constants/entities';
import * as R from 'ramda';

export const getActivePlayers = entitiesObj =>
  R.filter(R.where({ isPlaying: R.equals(R.T()) }), getPlayers(entitiesObj));

export const getPlayers = entitiesObj =>
  R.filter(R.where({ type: R.equals(entities.Player) }), R.values(entitiesObj));

export const getPlayersWithoutPlayerWithId = playerId =>
  R.reject(R.where({ id: R.equals(playerId) }));

export const getPlayersAsObject = players => R.zipObj(R.pluck('id', players), players);

export const getWinnerId = (entitiesObj, excludePlayerId = null) => {
  const players = getPlayersWithoutPlayerWithId(excludePlayerId)(
    getActivePlayers(entitiesObj)
  );

  if (R.equals(players.length, 1)) {
    return R.head(players).id;
  }
  return null;
};

export const getNextPlayerIdByTurn = (entitiesObj, currentTurn) => {
  const players = getPlayers(entitiesObj);
  const currentPlayerIdx = R.findIndex(R.where({ id: R.equals(currentTurn) }), players);
  const nextIdx = idx => R.modulo(R.inc(idx), players.length);

  for (let p, idx = nextIdx(currentPlayerIdx); idx !== currentPlayerIdx; ) {
    p = players[idx];
    if (p.isPlaying) return p.id;
    idx = nextIdx(idx);
  }
  return null;
};
