import { RECEIVE_USERS, ADD_QUESTION,  ADD_ANSWER } from "../action/Users";

export default function users(state = {}, action) {
  const { questionId, authedUser } = action
  switch (action.type) {
    case RECEIVE_USERS:
      const { users } = action;
      return {
        ...state,
        ...users,
      };
    case  ADD_ANSWER:
      const { answer } = action;
      return {
        ...state,
        [authedUser.authedUser]: {
          ...state[authedUser.authedUser],
          answers: {...state[authedUser.authedUser].answers,  [questionId]: authedUser.answer},
        },
      };
      case ADD_QUESTION:
        return {
          ...state,
          [authedUser]: {...state[authedUser],
            questions: [...state[authedUser].questions,  questionId],
          },
        };

    default:
      return state;
  }
}
