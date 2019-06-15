import {
  getNextPlayerId,
  getWinnerId,
  getActivePlayers,
  playersToObject,
} from './common';

import {
  switchFirstCardFromBuffer,
  switchCardToBuffer,
  isPlayerHasCard,
} from '../../models/player';

import cards from '../../constants/cards';
import { movePos, isPositionOutOfRange } from '../../models/position';
import { createMine } from '../../models/mine';

export const onMove = (state, action) => {
  const card = action.payload.card;

  let entities = state.entities;
  let roundMoves = state.roundMoves;
  let turn = state.turn;
  let isEnd = false;
  let winner = null;
  let player = entities[turn];
  let players = [];

  if (!isPlayerHasCard(player, card)) {
    throw 'Invalid move';
  }

  player = entities[player.id] = switchCardToBuffer(player, card);
  players = getActivePlayers({ entities });
  turn = getNextPlayerId(state);
  roundMoves = roundMoves + 1;

  if (isRoundOver(players, roundMoves)) {
    players = players.map(switchFirstCardFromBuffer);
    entities = executeMoves(
      { ...entities, ...playersToObject(players) },
      state.boardSize
    );

    roundMoves = 0;

    if ((winner = getWinnerId({ entities }))) {
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
  };
};

const isRoundOver = (players, roundMoves) => players.length === roundMoves;

const executeMoves = (entities, boardSize) => {
  const newEntities = {};
  const moves = getActivePlayers({ entities }).map(p => ({
    player: p,
    card: p.cards[0],
  }));

  moves.forEach(({ player, card }) => {
    switch (card.type) {
      case cards.Move:
        let currPos = player.position;
        let newPos = movePos(currPos, card.dir);

        if (isPositionOutOfRange(newPos, boardSize)) {
          // TODO: kolizja i dodatkowa animacja
          return;
        }
        newEntities[player.id] = {
          ...player,
          position: newPos,
        };
        break;
      case cards.Mine:
        const mine = createMine({ position: player.position });
        newEntities[mine.id] = mine;
        break;
    }
  });

  return Object.assign({}, entities, newEntities);
};
