import {
  gte,
  pipe,
  modulo,
  inc,
  length,
  ifElse,
  prop,
  findIndex,
  equals,
  where,
  head,
  __,
} from 'ramda';
import {
  getActivePlayers,
  getPlayersAlive,
  getPlayersWithoutPlayerWithId,
} from '../../models/player';

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
