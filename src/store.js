import { createStore } from './utils/redux';
import { applyMiddleware } from 'redux'
import logger from './utils/logger';
import rootReducer from './reducers/';

export default createStore(rootReducer, applyMiddleware(logger))
