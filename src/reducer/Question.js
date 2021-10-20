import {
  RECEIVE_QUESTIONS,
  ASK_QUESTIONS,
  ANSWER_QUESTION,
} from "../action/Question";

export default function questions(state = {}, action) {
  const { authedUser, questionId, answer, question } = action;
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ASK_QUESTIONS:
      return {
        ...state,
        [question.id]: question,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: state[questionId][answer].votes.concat(authedUser),
          },
        },
      };
    default:
      return state;
  }
}
