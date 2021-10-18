import { askQuestion, answerQuestion } from "./Users";
import { saveQuestionAnswer, saveQuestion } from "../utilities/Api";

// Receiving the question
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

// I change the name of the function so It can't be
// duplicate to askQuestion from user function.

// When ask question
export const ASK_QUESTIONS = "ASK_QUESTIONS";

export function theAskQuestions (question) {
  return {
    type: ASK_QUESTIONS,
    question,
  };
}

// handleFunction.
export function handleAskQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const { authedUser } = getState();
      return saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser,
      }).then((question) => {
        dispatch(theAskQuestions(question));
        dispatch(askQuestion(authedUser, question.id));
      });
    };
  }

// Again, I change the name of the function so It can't be
// duplicate to askQuestion from user function.

// When answer question
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function theAnswerQuestions({ authedUser, questionId, pollAnswer }) {
    return {
      type: ANSWER_QUESTION,
      authedUser,
      questionId,
      pollAnswer,
    };
  }

  export function handleAnswerQuestion(questionId, pollAnswer) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      dispatch(theAnswerQuestions({ authedUser, questionId, pollAnswer }));
      dispatch(answerQuestion({ authedUser, questionId, pollAnswer }));
      return saveQuestionAnswer({ authedUser, questionId, pollAnswer })
    };
  }
  
