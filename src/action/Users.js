// receive the user.
export const RECEIVE_USERS = "RECEIVE_USERS"

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

// Action: Ask Q
export const ASK_QUESTIONS = "ASK_QUESTIONS";

export function askQuestion(authedUser, questionId) {
    return {
      type: ASK_QUESTIONS,
      authedUser,
      questionId,
      };
  }

  //Action: Answer Q
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function answerQuestion( authedUser, questionId, pollAnswer ) {
    return {
      type: ANSWER_QUESTION,
      authedUser,
      questionId,
      pollAnswer,
    };
  }