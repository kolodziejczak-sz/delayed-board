import { createStore } from './utils/redux';
import { applyMiddleware } from 'redux'
import logger from './utils/logger';
import rootReducer from './reducers/';

const store = createStore(rootReducer, applyMiddleware(logger));

export const { dispatch } = store;
export default store; 
