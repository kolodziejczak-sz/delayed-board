import Immutable from 'seamless-immutable';
import {
  getNextPlayerId,
  getWinnerId,
  getActivePlayers,
  playersToObject,
} from './common';

import {
  switchFirstCardFromBuffer,
  switchCardToBuffer,
  doesPlayerHaveCard,
} from '../../models/player';

import cards from '../../constants/cards';
import { movePos, isPositionOutOfRange } from '../../models/position';
import { createMine } from '../../models/mine';

export const onMove = (state, action) => {
  const { card } = action.payload;
  let { entities, roundCounter, roundMoves, turn, isEnd, winner } = state;
  let player = entities[turn];
  let players = [];

  if (!doesPlayerHaveCard(player, card)) {
    throw 'Invalid move';
  }

  Immutable.setIn(state, ['entities', player.id], switchCardToBuffer(player, card));

  players = getActivePlayers(entities);
  turn = getNextPlayerId(entities, turn);
  roundMoves = roundMoves + 1;

  if (isRoundOver(players, roundMoves)) {
    roundMoves = 0;
    roundCounter = roundCounter + 1;

    players = players.map(switchFirstCardFromBuffer);

    // TODO: investigate mutations, throws error after second move
    Immutable.setIn(
      state,
      ['entities'],
      executeMoves({ ...entities, ...playersToObject(players) }, state.boardSize)
    );

    if ((winner = getWinnerId(entities))) {
      isEnd = true;
    }
  }

  return Immutable.merge(state, {
    turn,
    roundMoves,
    roundCounter,
    isEnd,
    winner,
    entities,
  });
};

const isRoundOver = (players, roundMoves) => players.length === roundMoves;

const executeMoves = (entities, boardSize) => {
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
