import card from './cards';
import range from './range';

export const deckComponents = {
  [card.Move]: 5,
  [card.Idle]: 2,
  [card.Attack]: 3,
  [card.Grenade]: 2,
  [card.Sniper]: 1,
  [card.Mine]: 1 
}

export const cardStatistics = {
  [card.Idle]: { damage: 0, range: range.Nil },
  [card.Move]: { damage: 25, range: range.Short },
  [card.Attack]: { damage: 25, range: range.Long },
  [card.Grenade]: { damage: 25, range: range.Cross },
  [card.Sniper]: { damage: 50, range: range.Full },
  [card.Mine]: { damage: 100, range: range.Nil } 
}

export default deckComponents;