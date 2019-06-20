import entities from '../../constants/entities';
import {
  __,
  equals,
  filter,
  findIndex,
  head,
  inc,
  modulo,
  pluck,
  T,
  reject,
  values,
  where,
  zipObj,
} from 'ramda';

export const getActivePlayers = entitiesObj =>
  filter(where({ isPlaying: equals(T()) }), getPlayers(entitiesObj));

export const getPlayers = entitiesObj =>
  filter(where({ type: equals(entities.Player) }), values(entitiesObj));

export const getPlayersWithoutPlayerWithId = playerId =>
  reject(where({ id: equals(playerId) }));

export const getPlayersAsObject = players => zipObj(pluck('id', players), players);

export const getWinnerId = (entitiesObj, excludePlayerId = null) => {
  const players = getPlayersWithoutPlayerWithId(excludePlayerId)(
    getActivePlayers(entitiesObj)
  );

  if (equals(players.length, 1)) {
    return head(players).id;
  }
  return null;
};

export const getNextPlayerIdByTurn = (entitiesObj, currentTurn) => {
  const players = getPlayers(entitiesObj);
  const currentPlayerIdx = findIndex(where({ id: equals(currentTurn) }), players);
  const nextIdx = idx => modulo(inc(idx), players.length);

  for (let p, idx = nextIdx(currentPlayerIdx); idx !== currentPlayerIdx; ) {
    p = players[idx];
    if (p.isPlaying) return p.id;
    idx = nextIdx(idx);
  }
  return null;
};
