export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const WRONG_ANSWER = 'WRONG_ANSWER';
export const RESET_SCORE = 'RESET_SCORE';

export function correctAnswer() {
  return {
    type: CORRECT_ANSWER
  };
}

export function wrongAnswer() {
  return {
    type: WRONG_ANSWER
  };
}

export function resetScore() {
  return {
    type: RESET_SCORE
  };
}
