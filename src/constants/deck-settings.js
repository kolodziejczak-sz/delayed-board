import cards from './cards';
import ranges from './ranges';

export const deckComponents = {
  [cards.Move]: 5,
  [cards.Idle]: 2,
  [cards.Attack]: 3,
  [cards.Grenade]: 2,
  [cards.Sniper]: 1,
  [cards.Mine]: 1 
}

export const cardStatistics = {
  [cards.Idle]: { damage: 0, range: ranges.Nil },
  [cards.Move]: { damage: 25, range: ranges.Short },
  [cards.Attack]: { damage: 25, range: ranges.Long },
  [cards.Grenade]: { damage: 25, range: ranges.Cross },
  [cards.Sniper]: { damage: 50, range: ranges.Full },
  [cards.Mine]: { damage: 100, range: ranges.Nil } 
}

export default deckComponents;