import entities from '../../constants/entities';
import {
  reduce,
  gte,
  pipe,
  modulo,
  inc,
  length,
  ifElse,
  prop,
  findIndex,
  equals,
  T,
  where,
  filter,
  values,
  mergeRight,
  __,
} from 'ramda';

export const getActivePlayers = entitiesObj =>
  filter(where({ isPlaying: equals(T()) }), getPlayers(entitiesObj));

export const getPlayers = entitiesObj =>
  filter(where({ type: equals(entities.Player) }), values(entitiesObj));

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
  const currentTurnPlayerId = findIndex(where({ id: equals(currentTurn) }), players);

  return ifElse(
    gte(__, 0),
    () =>
      prop(
        'id',
        players[
          pipe(
            inc,
            modulo(__, length(players))
          )(currentTurnPlayerId)
        ]
      ),
    () => null
  )(currentTurnPlayerId);
};

export const playersToObject = players =>
  reduce((acc, obj) => mergeRight(acc, { [prop('id', obj)]: obj }), {}, players);
