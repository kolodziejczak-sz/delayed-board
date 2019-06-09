import entity from './entity';
import entities from '../constants/entities';
import { generalSettings } from '../constants/settings';
import { getUuid } from '../utils/numbers';

const playerBase = {
  ...entity,
  type: entities.Player,
  health: generalSettings.maxHealth,
  isPlaying: true,
  user: null,
  cards: [],
  buffer: [],
}

export const createPlayer = (user, options = {}) => ({
  ...playerBase,
  ...options,
  id: getUuid(),
  user,
});
