import { createReducers } from 'redux-arc';
import { types } from '../actions/scene';

const initialState = {
  current: 'Menu'
};

const onChangeScene = (state, action) => ({
  ...state,
  current: action.payload,
});

export default createReducers(initialState, {
  [types.CHANGE_SCENE]: onChangeScene
});