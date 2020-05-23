import randomId from '../utils/randomId'

export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'


export function addQuestion(id, question) {
    return {
        type: ADD_QUESTION,
        question,
        id
    }
}


export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck: {
            ...deck,
            deck: [],
            id: deck.id || randomId(20)
        }
    }
}