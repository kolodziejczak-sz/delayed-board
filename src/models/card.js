export function createCard(type) {
  return { type }
}

export function createCards(type, number) {
  return Array(number).fill(null).map(_ => createCard(type));
}

export function createDeck(obj) {
  const createCardsType = (cards, [type, number]) => cards.concat(createCards(type, number));
  return Object.entries(obj).reduce(createCardsType, []);
}