import entities from '../../constants/entities';
import { deckComponents, deckStats } from '../../constants/settings';
import dirs from '../../constants/dirs';
import cards from '../../constants/cards';
import { movePos, isPositionEqual } from '../../models/position';
import { createMine } from '../../models/mine';

const getEntitiesFromPos = (entities, pos) => (Object.values(entities).filter(e => isPositionEqual((e.position, pos))));
const isInvalidPos = (pos, mapSize) => (pos.x === mapSize || pos.x === -1 || pos.y === mapSize || pos.y === -1)  
const isPlayerHasCard = (player, card) => Boolean(player.cards.find(c => c.type === card.type));
const isRoundOver = (players, roundMoves) => (players.length === roundMoves);
const getWinner = (players) => {
  const playersAlive = players.filter(p => p.health > 0);
  if(playersAlive.length === 1) {
    return playersAlive[0];
  }
  return null;
} 
const getPlayers = (entities) => Object.values(entities).filter(e => e.type === entities.Player);

const calcNextPlayer = (players, currentId) => {
  const idx = players.findIndex(p => p.id === currentId);
  if(idx === -1) {
    throw 'Current player does not exists';
  }
  return players[(idx + 1) % players.length];
}

const switchCardsFromBuffers = (players) => {
  return players.map(p => {
    let [move, ...restBuffer] =  p.buffer;
    return {
      ...p,
      buffer: restBuffer,
      cards: [ move, ...p.cards ]
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
    buffer: [ ...player.buffer, card]
  }
}

const executeMoves = (entities, mapSize) => {
  const players = Object.values(entities.filter(e => e.type === entities.Player));
  const moves = players.filter(e => e.type === entities.Player)
                  .map(p => ({ player: p, card: p.cards[0] }));
  const newEntities = {};

  for(let move, i = 0; i < moves.length; i ++) {
    move = moves[i];

    switch(move.card.type) {
      case cards.Move:
        let currPos = move.player.position;
        let newPos = movePos(currPos, move.card.dir);
        if(isInvalidPos(newPos, mapSize)) {
          continue;
        }
        // TODO: kolizje

        break;
      case cards.Mine:
        const mine = createMine({ position: currPos })
        newEntities[mine.id] = mine;
        break;
    }
  }
  const entities = {
    ...state.entities,
    ...players.reduce((e, p) => (e[p.id]=p, e), {})
  }
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

  let players = getPlayers(entities);
  let roundMoves = state.roundMoves + 1;
  const nextPlayer = calcNextPlayer(players, player.id);
  const turn = nextPlayer.id;

  if(isRoundOver(players, roundMoves)) {
    players = switchCardsFromBuffers(players);
    entities = executeMoves(players, state.mapSize);
    players = getPlayers(entities);
    roundMoves = 0;

    if(winner = getWinner(players)) {
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