import { ADD_QUESTION } from '../actions/questions'
export default function (state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return [...state]
        default:
            break;

    }
    return state;
}