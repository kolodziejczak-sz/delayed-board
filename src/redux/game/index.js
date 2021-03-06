import { createReducers, createActions } from 'redux-arc';
import Immutable from 'seamless-immutable';
import { generalSettings as gameSettings } from '../../constants/settings';
import { onStart } from './onStart';
import { onMove } from './onMove';
import { onSurrender } from './onSurrender';

const _ = null;

export const { types, creators } = createActions('game', {
  initBuffer: _,
  start: _,
  move: _,
  surrender: _,
});

const initialState = Immutable({
  ...gameSettings,
  roundCounter: 0,
  roundMoves: 0,
  turn: _,
  isEnd: _,
  winner: _,
  entities: [],
});

export default createReducers(initialState, {
  [types.START]: onStart,
  [types.SURRENDER]: onSurrender,
  [types.MOVE]: onMove,
});
