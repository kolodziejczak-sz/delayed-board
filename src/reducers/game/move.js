import { getPlayers } from '../../selectors/game';

function calcNextPlayer(players, currentId) {
  const idx = players.map(p => p.id).indexOf(currentId);
  if(idx !== -1) {
    throw 'Current player does not exists';
  }
  return players[(idx + 1) % players.length];
}

export const onMove = (state, action) => {
  const move = action.payload.card;
  const wrappedState = { game: state };
  const players = getPlayers(wrappedState);

  let roundMoves = state.roundMoves.concat([ { [playerId]: move } ]);


  if(roundMoves.length === players.length) {
    roundMoves = [];
    // TODO: egzekucja ruchów rundy.
  } else {
    const turn = state.nextTurn;
    const nextTurn = calcNextPlayer(players, turn).id
    return {
      ...state,
      turn,
      nextTurn
    }
  }

}