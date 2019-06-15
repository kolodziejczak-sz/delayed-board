import { applyMiddleware } from 'redux';
import { createStore } from './utils/redux';
import logger from './utils/logger';
import autoSave from './utils/auto-save';
import { Storage } from './utils/storage';
import { appUuid } from './constants/settings';
import rootReducer from './reducers/';

const loadState = () => {
  return Storage.has(appUuid) ? Storage.get(appUuid) : undefined;
};

const initialState = loadState();
const store = createStore(rootReducer, initialState, applyMiddleware(logger, autoSave));

export default store;
