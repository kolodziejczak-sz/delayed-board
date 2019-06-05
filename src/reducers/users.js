import { createReducers } from 'redux-arc';
import { types } from '../actions/users';
import icons from '../constans/icons';

const initialState = [
  {
    id: 0,
    icon: icons[0],
    name: 'User 1',
  },
  {
    id: 1,
    icon: icons[1],
    name: 'User 2',
  }
];

const onUpdateUser = (state, action) => {
  const update = action.payload;
  return state.map(p => Object.assign(p, (p.id === update.id) ? update : {}));
};

export default createReducers(initialState, {
  [types.UPDATE_USER]: onUpdateUser
});