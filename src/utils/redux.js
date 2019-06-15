import { writable, get } from 'svelte/store';

export function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  const currentState = reducer(preloadedState, { type: '___INIT___' });
  const store = writable(currentState);

  return {
    subscribe: store.subscribe,
    getState: () => get(store),
    dispatch: action => (store.update(state => reducer(state, action)), action),
  };
}
