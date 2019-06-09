import cards from '../../constants/cards';
import { movePos } from '../../models/position';
import { createMine } from '../../models/mine';
import { getPlayers, calcNextPlayerId, getWinnerId } from './helpers';

const isRoundOver = (players, roundMoves) => (players.length === roundMoves);
const isPlayerHasCard = (player, card) => Boolean(player.cards.find(c => c.type === card.type));
const isInvalidPos = (pos, boardSize) => (pos.x === boardSize || pos.x === -1 
                                       || pos.y === boardSize || pos.y === -1)  

const switchCardsFromBuffers = (players) => {
  return players.map(p => {
    const [head, ...restBuffer] =  p.buffer;
    return {
      ...p,
      buffer: restBuffer,
      cards: [ head, ...p.cards ]
    }
  })
}

const switchCardToBuffer = (player, card) => {
  const cards = player.cards;
  const cardIdx = cards.findIndex(c => c.type === card.type);
  if(cardIdx === -1) {
    throw 'Switching cards: invalid move';
  }

  return {
    ...player,
    cards: cards.slice(cardIdx, cardIdx + 1),
    // TODO: POPRAWIĆ
    buffer: [ ...player.buffer, card]
  }
}

const executeMoves = (entities, boardSize) => {
  const newEntities = {};
  const players = Object.values(entities.filter(e => e.type === entities.Player));
  const moves = players.filter(e => e.type === entities.Player)
                  .map(p => ({ player: p, card: p.cards[0] }));

  moves.forEach(({ player, card }) => {
    switch(card.type) {
      case cards.Move:
        let currPos = player.position;
        let newPos = movePos(currPos, card.dir);
        if(isInvalidPos(newPos, boardSize)) {
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

export const onMove = (state, action) => {
  const card = action.payload.card;
  let entities = state.entities;
  let player = entities[state.turn];
  let isEnd = false;
  let winner = null;

  if(!isPlayerHasCard(player, card)) {
    throw 'Invalid move';
  }

  player = switchCardToBuffer(player, card);
  console.log(player);

  let players = getPlayers(state);
  let roundMoves = state.roundMoves + 1;
  const nextPlayerId = calcNextPlayerId(state);
  const turn = nextPlayerId;

  if(isRoundOver(players, roundMoves)) {
    players = switchCardsFromBuffers(players);
    entities = executeMoves(players, state.boardSize);
    players = getPlayers({ entities });
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