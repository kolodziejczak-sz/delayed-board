let id = 0;

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getUuid() {
  return id++;
}
