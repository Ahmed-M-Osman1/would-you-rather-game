import { saveQuestionAnswer, saveQuestion } from "../utilities/Api";
import { addAnswer, addQuestion } from "./Users";

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

export function askQuestion (question) {
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
        dispatch(askQuestion( question ));
        dispatch(addQuestion(authedUser, question.id));
      });
    };
  }

// Again, I change the name of the function so It can't be
// duplicate to askQuestion from user function.

// When answer question
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function answerQuestion({ authedUser, questionId, answer }) {
    return {
      type: ANSWER_QUESTION,
      authedUser,
      questionId,
      answer,
    };
  }

  export function handleAnswerQuestion(questionId, answer) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      dispatch(answerQuestion({ authedUser, questionId, answer }));
      dispatch(addAnswer({ authedUser, questionId, answer }));
      return saveQuestionAnswer({ 
        authedUser, 
        qid: questionId, 
        answer }
      )
    };
  }
  
