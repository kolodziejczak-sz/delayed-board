import { getUuid } from '../utils/numbers';

export function createCard(type) {
  return {
    id: getUuid(),
    type: Number(type),
  };
}

export function createCards(type, number) {
  return [...Array(number)].map(_ => createCard(type));
}

export function createDeck(obj) {
  const createCardsType = (cards, [type, number]) =>
    cards.concat(createCards(type, number));
  return Object.entries(obj).reduce(createCardsType, []);
}
