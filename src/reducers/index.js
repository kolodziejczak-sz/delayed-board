import { combineReducers } from 'redux';
import scene from './scene';
import users from './users';
import game from './game';

export default combineReducers({
  scene,
  users,
  game
});