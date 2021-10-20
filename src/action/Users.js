// receive the user.
export const RECEIVE_USERS = "RECEIVE_USERS"

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

// Action: Ask Q
export const ADD_QUESTION = "ADD_QUESTION";

export function addQuestion(authedUser, questionId) {
    return {
      type: ADD_QUESTION,
      authedUser,
      questionId
      };
  }

  //Action: Answer Q
export const ADD_ANSWER = "ADD_ANSWER";

export function addAnswer( authedUser, questionId, answer ) {
    return {
      type: ADD_ANSWER,
      authedUser,
      questionId,
      answer,
    };
  }