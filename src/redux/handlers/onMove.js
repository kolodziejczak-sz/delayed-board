import Immutable from 'seamless-immutable';
import { inc, equals, map, mergeRight } from 'ramda';

import {
  getNextPlayerIdByTurn,
  getWinnerId,
  getActivePlayers,
  getPlayersAsObject,
} from './common';

import {
  getPlayerWithFirstCardMovedFromBufferToCards,
  getPlayerWithCardMovedToBuffer,
  doesPlayerHaveCard,
} from '../../models/player';

import cards from '../../constants/cards';
import { movePos, isPositionOutOfRange } from '../../models/position';
import { createMine } from '../../models/mine';

// TODO: simplify with ramda fns
export const onMove = (state, action) => {
  const { card } = action.payload;
  const { entities, roundCounter, roundMoves, turn } = state;
  const currentPlayer = entities[turn];

  if (!doesPlayerHaveCard(currentPlayer, card)) {
    throw 'Invalid move';
  }

  const nextState = {
    entities: {
      ...entities,
      [currentPlayer.id]: getPlayerWithCardMovedToBuffer(currentPlayer, card),
    },
    roundMoves: inc(roundMoves),
  };

  let activePlayers = getActivePlayers(nextState.entities);

  if (isRoundOver(activePlayers, nextState.roundMoves)) {
    nextState.roundMoves = 0;
    nextState.roundCounter = inc(roundCounter);

    activePlayers = map(getPlayerWithFirstCardMovedFromBufferToCards, activePlayers);

    nextState.entities = getEntitiesAfterCardsExecution(
      mergeRight(nextState.entities, getPlayersAsObject(activePlayers)),
      state.boardSize
    );

    if ((nextState.winner = getWinnerId(entities))) {
      nextState.isEnd = true;
    }
  }

  nextState.turn = getNextPlayerIdByTurn(nextState.entities, turn);
  return Immutable.merge(state, nextState);
};

const isRoundOver = (players, roundMoves) => equals(players.length, roundMoves);

const getEntitiesAfterCardsExecution = (entities, boardSize) => {
  const newEntities = {};
  const moves = getActivePlayers(entities).map(p => ({
    player: p,
    card: p.cards[0],
  }));

  moves.forEach(({ player, card }) => {
    switch (card.type) {
      case cards.Move:
        let currPos = player.position;
        let newPos = movePos(currPos, card.dir);

        if (isPositionOutOfRange(newPos, boardSize)) {
          // TODO: collision detection
          newPos = mergeRight(currPos, { dir: newPos.dir });
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
