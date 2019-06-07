import { createStore } from './utils/redux';
import { applyMiddleware } from 'redux'
import logger from './utils/logger';
import autoSave from './utils/auto-save';
import rootReducer from './reducers/';
import { Storage } from './utils/storage';
import storageSettings  from './constants/storage-settings';

function loadState() {
  if(Storage.has(storageSettings.key)) {
    return Storage.get(storageSettings.key);
  }
  return undefined;
}

const store = createStore(rootReducer, loadState(), applyMiddleware(logger, autoSave));

export const { dispatch } = store;
export default store; 
