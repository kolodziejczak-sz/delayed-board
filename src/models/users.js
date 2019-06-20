import { getUuid } from '../utils/numbers';
import icons from '../constants/icons';

export const createUser = (name, iconId) => ({
  id: getUuid(),
  icon: icons[iconId],
  name,
});
