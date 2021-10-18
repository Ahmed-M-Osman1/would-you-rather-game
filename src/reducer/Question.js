import {
  RECEIVE_QUESTIONS,
  ASK_QUESTIONS,
  ANSWER_QUESTION,
} from "../action/Question";

export default function questions(state = {}, action) {
  const { authedUser, questionId, answers } = action;
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ASK_QUESTIONS:
      return {
        ...state,
        [action.questions]: action.questions,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answers]: {
            ...state[questionId][answers],
            votes: state[questionId][answers].votes.concat(authedUser),
          },
        },
      };
    default:
      return state;
  }
}
