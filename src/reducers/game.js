import { createReducers } from 'redux-arc';
import { types } from '../actions/game';
import { createPlayer } from '../models/player';
import { getRandomPosition } from '../models/position';
import { createDeck } from '../models/card';
import deckSettings from '../constans/deck-settings';

const defaultGame = {
  mapSize: 8,
  bufferSize: 5,
  round: 0,
  turn: null,
  isEnd: null,
  winner: null,
  entities: [],
};

const onStart = (state, action) => {
  const mapMaxIdx = (state.mapSize - 1);
  const users = action.payload.users;
  const players = users.map((user, idx) => createPlayer(user, { 
    cards: createDeck(deckSettings),
    position: getRandomPosition(0, mapMaxIdx, (idx * 5), (idx * 5 + 2))
  }));

  const entities = [ ...players ];

  const turn = players[0].id;

  return {
    ...defaultGame,
    isEnd: false,
    turn,
    entities
  }
};

export default createReducers(defaultGame, {
  [types.START]: onStart
});