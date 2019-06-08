export function createCard(type) {
  return { type, dir }
}

export function createCards(type, number) {
  return Array(number).fill(null).map(i => createCard(type));
}

export function createDeck(obj) {
  const createCardsType = (cards, [type, number]) => cards.concat(createCards(type, number));
  return Object.entries(obj).reduce(createCardsType, []);
}