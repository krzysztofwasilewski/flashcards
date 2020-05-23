import {ADD_QUESTION, ADD_DECK} from '../actions/questions';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deck: [...state[action.id].deck, action.question]
        }
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck
      };

    default:
      break;
  }
  return state;
}
