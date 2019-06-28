import Immutable from 'seamless-immutable';
import * as R from 'ramda';
import { createPlayers } from '../game/onStart';
import { getPlayersAsObject } from '../game/selectors';
import { createUser } from '../../models/user';
import icons from '../../constants/icons';

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
  users: [createUser('User 1', icons[0]), createUser('User 2', icons[1])],
});

export const createStoreInstance = () => ({
  state: initialState,
  gameStart(initialState = this.state) {
    this.state = R.compose(
      R.assocPath(['game', 'isEnd'], false),
      state =>
        R.assocPath(
          ['game', 'turn'],
          Number(R.head(Object.keys(state.game.entities))),
          state
        ),
      R.assocPath(['scene', 'current'], 'Game'),
      state =>
        R.assocPath(
          ['game', 'entities'],
          getPlayersAsObject(createPlayers(state.game.boardSize, state.users)),
          state
        )
    )(initialState);

    return this;
  },
  withOnePlayerInactive(playerEntityId) {
    const entityId =
      playerEntityId ||
      R.pipe(
        R.path(['game', 'entities']),
        R.keys,
        R.head
      )(this.state);

    this.state = R.assocPath(
      ['game', 'entities', entityId, 'isPlaying'],
      false,
      this.state
    );

    return this;
  },
});
