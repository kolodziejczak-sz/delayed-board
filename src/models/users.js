import { getUuid } from '../utils/numbers';
import icons from '../constants/icons';

export const createUser = (name, icon) => ({
  id: getUuid(),
  icon: icons[icon],
  name,
});
