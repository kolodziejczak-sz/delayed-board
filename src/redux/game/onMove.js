import Immutable from 'seamless-immutable';
import * as R from 'ramda';

import {
  getNextPlayerIdByTurn,
  getWinnerId,
  getActivePlayers,
  getPlayersAsObject,
} from './selectors';

import {
  getPlayerWithFirstCardMovedFromBufferToCards,
  getPlayerWithCardMovedToBuffer,
  doesPlayerHaveCard,
} from '../../models/player';

import cards from '../../constants/cards';
import { movePos, isPositionOutOfRange } from '../../models/position';
import { createMine } from '../../models/mine';

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
    roundMoves: R.inc(roundMoves),
  };

  let activePlayers = getActivePlayers(nextState.entities);

  if (isRoundOver(activePlayers, nextState.roundMoves)) {
    nextState.roundMoves = 0;
    nextState.roundCounter = R.inc(roundCounter);

    activePlayers = R.map(getPlayerWithFirstCardMovedFromBufferToCards, activePlayers);

    nextState.entities = getEntitiesAfterCardsExecution(
      R.mergeRight(nextState.entities, getPlayersAsObject(activePlayers)),
      state.boardSize
    );

    if ((nextState.winner = getWinnerId(entities))) {
      nextState.isEnd = true;
    }
  }

  nextState.turn = getNextPlayerIdByTurn(nextState.entities, turn);
  return Immutable.merge(state, nextState);
};

const isRoundOver = (players, roundMoves) => R.equals(players.length, roundMoves);

const getEntitiesAfterCardsExecution = (entities, boardSize) => {
  const newEntities = {};
  const moves = R.map(p => ({ player: p, card: p.cards[0] }), getActivePlayers(entities));

  moves.forEach(({ player, card }) => {
    switch (card.type) {
      case cards.Move:
        let currPos = player.position;
        let newPos = movePos(currPos, card.dir);

        if (isPositionOutOfRange(newPos, boardSize)) {
          // TODO: collision detection
          newPos = R.mergeRight(currPos, { dir: newPos.dir });
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
