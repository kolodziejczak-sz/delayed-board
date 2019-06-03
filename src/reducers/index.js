import { combineReducers } from 'redux';
import scene from './scene';
import players from './players';

export default combineReducers({
  scene,
  players
});