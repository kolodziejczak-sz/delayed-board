import { getUuid } from '../utils/numbers';

export const createUser = (name, icon) => ({
  id: getUuid(),
  name,
  icon,
});
