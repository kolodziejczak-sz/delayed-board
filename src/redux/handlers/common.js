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
  gt,
  reject,
  head,
  __,
} from 'ramda';

export const getActivePlayers = entitiesObj =>
  filter(where({ isPlaying: equals(T()) }), getPlayers(entitiesObj));

export const getPlayers = entitiesObj =>
  filter(where({ type: equals(entities.Player) }), values(entitiesObj));

const getPlayersAlive = filter(where({ health: gt(__, 0) }));
const getPlayersWithoutPlayerWithId = playerId => reject(where({ id: equals(playerId) }));

export const getWinnerId = (entitiesObj, excludePlayerId = null) => {
  const players = getPlayersWithoutPlayerWithId(excludePlayerId)(
    getActivePlayers(entitiesObj)
  );
  const playersAlive = getPlayersAlive(players);

  if (equals(playersAlive.length, 1)) {
    return head(playersAlive).id;
  }
  return null;
};

export const getNextPlayerIdByTurn = (entitiesObj, currentTurn) => {
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
