import deckSettings from '../../constants/deck-settings';
import { createPlayer } from '../../models/player';
import { createRandomPosition } from '../../models/position';
import { createDeck } from '../../models/card';

export const onStart = (state, action) => {
  const mapMaxIdx = (state.mapSize - 1);
  const users = action.payload.users;

  const players = users.map((user, idx) => createPlayer(user, { 
    cards: createDeck(deckSettings),
    position: createRandomPosition(0, mapMaxIdx, (idx * 5), (idx * 5 + 2))
  }));

  const entities = [ ...players ].reduce((acc, e) => (acc[e.id] = e, acc), {});

  return {
    ...state,
    isEnd: false,
    entities,
    round: 0,
    roundMoves: [],
    turn: players[0].id,
    nextTurn: players[1].id,
  }
};
