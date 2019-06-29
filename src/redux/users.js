import * as R from 'ramda';
import Immutable from 'seamless-immutable';
import { createReducers, createActions } from 'redux-arc';
import { createUser } from '../models/user';
import icons from '../constants/icons';

export const { types, creators } = createActions('users', {
  updateUser: null,
});

const initialState = Immutable([
  createUser('User 1', icons[0]),
  createUser('User 2', icons[1]),
]);

const onUpdateUser = (state, action) => {
  const update = action.payload;

  return R.map(R.when(R.propEq('id', update.id), R.mergeRight(R.__, update)), state);
};

export default createReducers(initialState, {
  [types.UPDATE_USER]: onUpdateUser,
});
