import { deckComponents } from '../../constants/settings';
import { createPlayer } from '../../models/player';
import { createRandomPosition } from '../../models/position';
import { createDeck } from '../../models/card';

export const onStart = (state, action) => {
  const boardMaxIdx = (state.boardSize - 1);
  const users = action.payload.users;
  const players = users.map((user, idx) => createPlayer(user, { 
    cards: createDeck(deckComponents),
    position: createRandomPosition(0, boardMaxIdx, (idx * 5), (idx * 5 + 2))
  }));

  const entities = [ ...players ].reduce((acc, e) => (acc[e.id] = e, acc), {});

  return {
    ...state,
    isEnd: false,
    entities,
    round: 0,
    roundMoves: 0,
    turn: players[0].id
  }
};
