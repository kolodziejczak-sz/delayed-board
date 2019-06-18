import { describe } from 'riteway';
import Immutable from 'seamless-immutable';

// TODO: prepare mocks, write UTs

const initialState = Immutable({});

describe('onMove()', async assert => {
  // 1. Should move player card to player buffer
  // 2. Should increment round moves
  // 3. Should set state.turn to next player id
  //
  //// When round is over
  // 1. Should set state.roundMoves to 0
  // 2. Should increment state.roundCounter
  // 3. Should update players positions
  // 4. Should set state.winner
  //
  //// && When winner is truthful
  // 1. Should set state.isEnd to true
});

describe('updateActivePlayersPosition()', async assert => {
  //// when position is not out of range
  // 1. Should assign new position to player entity
  //// when position is out of range
  // 1. Should not change entities
});
