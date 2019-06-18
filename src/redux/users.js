import { createReducers, createActions } from 'redux-arc';
import { __, map, mergeRight, when, propEq } from 'ramda';
import { getUuid } from '../utils/numbers';
import icons from '../constants/icons';
import Immutable from 'seamless-immutable';

export const { types, creators } = createActions('users', {
  updateUser: null,
});

const initialState = Immutable([
  {
    id: getUuid(),
    icon: icons[0],
    name: 'User 1',
  },
  {
    id: getUuid(),
    icon: icons[1],
    name: 'User 2',
  },
]);

const onUpdateUser = (state, action) => {
  const update = action.payload;

  return map(when(propEq('id', update.id), mergeRight(__, update)), state);
};

export default createReducers(initialState, {
  [types.UPDATE_USER]: onUpdateUser,
});
