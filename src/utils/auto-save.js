import { appUuid } from '../constants/settings';
import { Storage } from './storage';

export default function autoSave({ getState }) {
  return next => action => {
    const returnValue = next(action);

    Storage.set(appUuid, getState());

    return returnValue;
  };
}
