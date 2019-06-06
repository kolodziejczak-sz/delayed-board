export const cardTypes = {
  Idle: 1,
  Defense: 2,
  Move: 3,
  Attack: 4,
  Sniper: 5,
  Grenade: 6,
  Mine: 7
};

export function createCard(type) {
  return { type }
}

export function createCards(type, number) {
  return Array(number).fill(null).map(i => createCard(type));
}

export function createDeck(obj) {
  const createCardsType = (cards, [type, number]) => cards.concat(createCards(type, number));
  return Object.entries(obj).reduce(createCardsType, []);
}