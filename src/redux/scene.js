import { createReducers, createActions } from 'redux-arc';
import Immutable from 'seamless-immutable';

export const { types, creators } = createActions('scene', {
  changeScene: null,
});

const initialState = Immutable({
  current: 'Menu',
});

const onChangeScene = (state, action) => {
  return Immutable.set(state, 'current', action.payload);
};

export default createReducers(initialState, {
  [types.CHANGE_SCENE]: onChangeScene,
});
