import { createReducers, createActions } from 'redux-arc';
import { __, map, mergeRight, when, propEq } from 'ramda';
import Immutable from 'seamless-immutable';
import { createUser } from '../models/user';

export const { types, creators } = createActions('users', {
  updateUser: null,
});

const initialState = Immutable([createUser('User 1', 0), createUser('User 2', 1)]);

const onUpdateUser = (state, action) => {
  const update = action.payload;

  return map(when(propEq('id', update.id), mergeRight(__, update)), state);
};

export default createReducers(initialState, {
  [types.UPDATE_USER]: onUpdateUser,
});
