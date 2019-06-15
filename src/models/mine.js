import entity from './entity';
import entities from '../constants/entities';
import { getUuid } from '../utils/numbers';

const mineBase = {
  ...entity,
  type: entities.Mine,
};

export const createMine = (options = {}) => ({
  ...mineBase,
  ...options,
  id: getUuid(),
});
