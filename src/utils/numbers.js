let id = 999;

export function getRandomInteger(min, max) {
  return Math.floor((Math.random() * max) + min);
}

export function getUuid() {
  return id++;
}