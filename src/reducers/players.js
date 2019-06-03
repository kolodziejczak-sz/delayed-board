import { createReducers } from 'redux-arc';
import { types } from '../actions/players';
import icons from '../constans/icons';

const initialState = [
  {
    id: 0,
    icon: icons[0],
    name: 'Player 1',
  },
  {
    id: 1,
    icon: icons[1],
    name: 'Player 2',
  }
];

const onUpdatePlayer = (state, action) => {
  const update = action.payload;
  return state.map(p => Object.assign(p, (p.id === update.id) ? update : {}));
};

export default createReducers(initialState, {
  [types.UPDATE_PLAYER]: onUpdatePlayer
});