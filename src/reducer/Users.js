import { RECEIVE_USERS, ASK_QUESTIONS, ANSWER_QUESTION } from "../action/Users";

export default function users(state = {}, action) {
  const { authedUser, questionId, answer } = action;
  switch (action.type) {
    case RECEIVE_USERS: {
      return {
        ...state,
        ...action.users,
      };
    }
    case ANSWER_QUESTION: {
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: Object.assign(state[authedUser].answers, { [questionId]: answer }),
        },
      };
    }
    case ASK_QUESTIONS: {
      return {
        ...state,
        [authedUser]: {
          ...authedUser,
          questions: state[authedUser].questions.concat([questionId]),
        }
      }
    }
    default:
      return state;
  }
}
