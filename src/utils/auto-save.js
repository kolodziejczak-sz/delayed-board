import storageSettings  from '../constants/storage-settings';
import { Storage } from './storage';

export default function autoSave({ getState }) {
  return next => action => {
    const returnValue = next(action);

    Storage.set(storageSettings.key, getState());

    return returnValue
  }
}