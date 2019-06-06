import { cardTypes } from '../models/card';

export default {
  [cardTypes.Move]: 5,
  [cardTypes.Idle]: 2,
  [cardTypes.Defense]: 1,
  [cardTypes.Attack]: 3,
  [cardTypes.Grenade]: 2,
  [cardTypes.Sniper]: 1,
  [cardTypes.Mine]: 1 
}