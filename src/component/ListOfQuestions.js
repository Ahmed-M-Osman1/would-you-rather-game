import React, { Component } from "react";
import PropTypes from "prop-types";
import EachQuestionItem from "./EachQuestionItem.js";

class listOfQuestions extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        {questions.map((question) => (
          <EachQuestionItem key={question.id} question={question} />
        ))}
      </div>
    );
  }
}

listOfQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default listOfQuestions;
