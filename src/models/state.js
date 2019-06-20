import Immutable from 'seamless-immutable';
import { compose, assocPath, head } from 'ramda';
import { createPlayerEntities } from './player';
import { createUser } from './users';

const initialState = Immutable({
  game: {
    boardSize: 8,
    bufferSize: 5,
    entities: [],
    isEnd: null,
    maxHealth: 100,
    maxPlayers: 2,
    roundCounter: 0,
    roundMoves: 0,
    turn: null,
    winner: null,
  },
  scene: {
    current: 'Menu',
  },
  users: [createUser('User 1', 0), createUser('User 2', 1)],
});

export const gameStartState = compose(
  assocPath(['game', 'isEnd'], false),
  state => assocPath(['game', 'turn'], Number(head(Object.keys(state.game.entities))), state),
  assocPath(['scene', 'current'], 'Game'),
  state =>
    assocPath(
      ['game', 'entities'],
      createPlayerEntities(state.game.boardSize, state.users),
      state
    )
)(initialState);
