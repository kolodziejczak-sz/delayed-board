import { getRandomInteger } from '../utils/numbers'

export default {
  x: 0,
  y: 0,
  dir: 0
}

export function createPosition(x, y, dir) {
  return {
    x, y, dir
  }
}

export function getRandomPosition(colMin, colMax, rowMin, rowMax) {
  return {
    x: getRandomInteger(colMin, colMax),
    y: getRandomInteger(rowMin, rowMax),
    dir: 0
  }
}