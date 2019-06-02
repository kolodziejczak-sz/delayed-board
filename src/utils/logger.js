export default function logger({ getState }) {
  return next => action => {
    console.group('Action type', action.type);
    console.log('State before dispatch', getState())
    console.log('Will dispatch', action)

    const returnValue = next(action)

    console.log('State after dispatch', getState())
    console.groupEnd();

    return returnValue
  }
}