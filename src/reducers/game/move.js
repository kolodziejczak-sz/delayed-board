import cards from '../../constants/cards';
import { movePos } from '../../models/position';
import { createMine } from '../../models/mine';
import { getPlayers, getNextPlayerId, getWinnerId, getActivePlayers } from './helpers';

const isRoundOver = (state, roundMoves) => (getActivePlayers(state) === roundMoves);
const isPlayerHasCard = (player, card) => Boolean(player.cards.find(c => c.type === card.type));
const isInvalidPos = (pos, boardSize) => (pos.x === boardSize || pos.x === -1 
                                       || pos.y === boardSize || pos.y === -1)  

const switchFirstCardFromBuffer = (players) => {
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
  // TODO: ZZAMIENIC TYPE NA ID 
  if(cardIdx === -1) {
    throw 'Switching cards: invalid move';
  }

  return {
    ...player,
    cards: cards.slice(cardIdx, cardIdx + 1),
    buffer: [ ...player.buffer, card]
  }
}

const executeMoves = (entities, boardSize) => {
  const newEntities = {};
  const playersAfterBufferReload = switchFirstCardFromBuffer(getPlayers());
  const moves = playersAfterBufferReload.filter(e => e.type === entities.Player)
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
  let entities = state.entities;
  let isEnd = false;
  let winner = null;
  const card = action.payload.card;
  const player = entities[state.turn];

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