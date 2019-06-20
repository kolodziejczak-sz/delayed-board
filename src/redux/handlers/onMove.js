import Immutable from 'seamless-immutable';
import { inc, equals } from 'ramda';

import { getNextPlayerIdByTurn, getWinnerId } from './common';

import {
  getPlayerWithFirstCardMovedFromBufferToCards,
  getPlayerWithCardMovedToBuffer,
  doesPlayerHaveCard,
  getActivePlayers,
  getPlayersAsObject,
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

  nextState.turn = getNextPlayerIdByTurn(nextState.entities, turn);
  const activePlayers = getActivePlayers(nextState.entities);

  if (isRoundOver(activePlayers, nextState.roundMoves)) {
    nextState.roundMoves = 0;
    nextState.roundCounter = inc(roundCounter);

    const players = activePlayers.map(getPlayerWithFirstCardMovedFromBufferToCards);

    nextState.entities = getEntitiesAfterExecutionFirstCardOfEachActivePlayer(
      { ...nextState.entities, ...getPlayersAsObject(players) },
      state.boardSize
    );

    nextState.winner = getWinnerId(entities);

    if (nextState.winner) {
      nextState.isEnd = true;
    }
  }

  return Immutable.merge(state, nextState);
};

const isRoundOver = (players, roundMoves) => equals(players.length, roundMoves);

const getEntitiesAfterExecutionFirstCardOfEachActivePlayer = (entities, boardSize) => {
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
          // TODO: collisions && animations in separate fn
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
