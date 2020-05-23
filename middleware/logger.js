export default ({ getState }) => next => action => {
    console.group('Redux logger');
    console.log('State before:', getState());
    console.log('Action', action);
    const retVal = next(action)
    console.log('State after:', getState())
    console.groupEnd();
    return retVal
}