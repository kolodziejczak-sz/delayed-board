import { getRandomInteger } from '../utils/numbers';
import dirs from '../constants/dirs';

export default {
  x: 0,
  y: 0,
  dir: dirs.Top,
};

export function createPosition(x, y, dir) {
  return {
    x,
    y,
    dir,
  };
}

export function createRandomPosition(colMin, colMax, rowMin, rowMax) {
  return createPosition(
    getRandomInteger(colMin, colMax),
    getRandomInteger(rowMin, rowMax),
    0
  );
}

export function movePos(position, dir) {
  let { x, y } = position;

  if (dir === dirs.Top) y -= 1;
  else if (dir === dirs.Bottom) y += 1;
  else if (dir === dirs.Right) x += 1;
  else if (dir === dirs.Left) x -= 1;

  return {
    x,
    y,
    dir,
  };
}

export function isPositionEqual(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function isPositionOutOfRange(pos, range) {
  return pos.x === range || pos.x === -1 || pos.y === range || pos.y === -1;
}
