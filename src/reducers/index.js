import { combineReducers } from 'redux';
import scene from './scene';
import users from './users';

export default combineReducers({
  scene,
  users
});