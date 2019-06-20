import Immutable from 'seamless-immutable';
import { head } from 'ramda';
import { createPlayerEntities } from '../../models/player';

export const onStart = (state, action) => {
  const playerEntities = createPlayerEntities(state.boardSize, action.payload.users);

  return Immutable.merge(state, {
    isEnd: false,
    entities: playerEntities,
    roundCounter: 0,
    roundMoves: 0,
    turn: Number(head(Object.keys(playerEntities))),
  });
};
