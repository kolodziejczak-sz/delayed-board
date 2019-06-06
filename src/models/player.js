import entity from './entity';
import { getUuid } from '../utils/numbers';

const playerBase = {
  ...entity,
  type: 'PLAYER',
  user: null,
  health: 100,
  cards: [],
  buffer: [],
}

export const createPlayer = (user, options = {}) => ({
  ...playerBase,
  ...options,
  id: getUuid(),
  user,
});
