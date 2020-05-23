import { CORRECT_ANSWER, WRONG_ANSWER, RESET_SCORE } from '../actions/currentGame'

export default function ({ correctAnswerNum = 0, wrongAnswerNum = 0 } = {}, action) {
    switch (action.type) {
        case CORRECT_ANSWER:
            return {
                correctAnswerNum: correctAnswerNum + 1,
                wrongAnswerNum
            }
        case WRONG_ANSWER:
            return {
                correctAnswerNum,
                wrongAnswerNum: wrongAnswerNum + 1
            }
        case RESET_SCORE:
            return {
                correctAnswerNum: 0,
                wrongAnswerNum: 0
            }
        default: break;

    }
    return { correctAnswerNum, wrongAnswerNum }
}