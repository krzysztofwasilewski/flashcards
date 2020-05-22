export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}