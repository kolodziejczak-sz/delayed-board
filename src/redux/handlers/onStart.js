import Immutable from 'seamless-immutable';
import { addIndex, map } from 'ramda';
import { getRandomInteger } from '../../utils/numbers';
import { deckComponents } from '../../constants/settings';
import { createRandomPosition } from '../../models/position';
import { createPlayer } from '../../models/player';
import { getPlayersAsObject } from './common';
import { createDeck } from '../../models/card';

export const createPlayers = (boardSize, users) => {
  const mapIndexed = addIndex(map);
  return mapIndexed(
    (user, idx) =>
      createPlayer(user, {
        cards: createDeck(deckComponents),
        position: createRandomPosition(0, boardSize - 1, idx * 5, idx * 5 + 2),
      }),
    users
  );
};

export const onStart = (state, action) => {
  const players = createPlayers(state.boardSize, action.payload.users);
  const playerEntities = getPlayersAsObject(players);

  return Immutable.merge(state, {
    isEnd: false,
    roundCounter: 0,
    roundMoves: 0,
    winner: null,
    entities: playerEntities,
    turn: players[getRandomInteger(0, players.length - 1)].id,
  });
};
