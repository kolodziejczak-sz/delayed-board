import { createReducers } from 'redux-arc';
import { types } from '../../actions/game';

import gameSettings from '../../constants/game-settings';
import { onMove } from './move';
import { onSurrender } from './surrender';
import { onStart } from './start';

const defaultGame = {
  ...gameSettings,
  round: 0,
  roundMoves: [],
  turn: null,
  nextTurn: null,
  isEnd: null,
  winner: null,
  entities: [],
};

export default createReducers(defaultGame, {
  [types.START]: onStart,
  [types.SURRENDER]: onSurrender,
  [types.MOVE]: onMove
});