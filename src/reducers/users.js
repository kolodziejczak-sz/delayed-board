import { createReducers } from 'redux-arc';
import { types } from '../actions/users';
import { getUuid } from '../utils/numbers';
import icons from '../constants/icons';

const initialState = [
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
];

const onUpdateUser = (state, action) => {
  const update = action.payload;
  return state.map(p => Object.assign(p, p.id === update.id ? update : {}));
};

export default createReducers(initialState, {
  [types.UPDATE_USER]: onUpdateUser,
});
