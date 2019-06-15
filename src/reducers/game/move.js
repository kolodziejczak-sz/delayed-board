import cards from '../../constants/cards';
import { movePos, isPositionOutOfRange } from '../../models/position';
import { createMine } from '../../models/mine';
import { getNextPlayerId, getWinnerId, getActivePlayers } from './common';
import { switchFirstCardFromBuffer, switchCardToBuffer, isPlayerHasCard } from '../../models/player';

export const onMove = (state, action) => {
  let entities = state.entities;
  let isEnd = false;
  let winner = null;
  const player = entities[state.turn];
  const card = action.payload.card;

  if(!isPlayerHasCard(player, card)) {
    throw 'Invalid move';
  }

  entities[player.id] = switchCardToBuffer(player, card);
  const turn = getNextPlayerId(state);
  let roundMoves = state.roundMoves + 1;

  if(isRoundOver(state, roundMoves)) {
    entities = executeMoves(entities, state.boardSize);
    roundMoves = 0;

    if(winner = getWinnerId(state)) {
      isEnd = true;
    }
  }

  return {
    ...state,
    turn,
    roundMoves,
    isEnd,
    winner,
    entities,
  }
}

const isRoundOver = (state, roundMoves) => (getActivePlayers(state).length === roundMoves);

const executeMoves = (entities, boardSize) => {
  const newEntities = {};

  const playersAfterBufferReload = getActivePlayers({entities}).map(switchFirstCardFromBuffer);
  const moves = playersAfterBufferReload.map(p => ({ player: p, card: p.cards[0] }));

  moves.forEach(({ player, card }) => {
    switch(card.type) {
      case cards.Move:
        let currPos = player.position;
        let newPos = movePos(currPos, card.dir);

        if(isPositionOutOfRange(newPos, boardSize)) {
          // TODO: kolizja i dodatkowa animacja
          return;
        }
        newEntities[player.id] = {
          ...player,
          position: newPos
        }
        break;
      case cards.Mine:
        const mine = createMine({ position: currPos })
        newEntities[mine.id] = mine;
        break;
    }
  });

  return Object.assign({}, entities, newEntities);
}
