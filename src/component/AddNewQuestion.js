import React, { Component } from "react";
import { handleAskQuestion } from "../action/Question";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AddNewQuestion extends Component {
  // add local state for the asked Questions.
  state = {
    redirect: false,
    questionOne: "",
    questionTwo: "",
  };

// handleChange as tyler
handleChange = (e) => {
    e.preventDefault();
    const element = e.target;
    this.setState({ [element.id]: element.value });
  };


// handleSubmit as tyler
  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { questionOne, questionTwo } = this.state;

    dispatch(handleAskQuestion(questionOne, questionTwo));

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="question new-question">
          <div className="new-question-header">
            <p> Ask New Question </p>
          </div>
          <div className="new-question-content">
            <h1>Would You Rather?</h1>
            <form onSubmit={this.handleSubmit}>
              <input
              onChange={this.handleChange}
              id="questionOptionOne"
                type="text"
                name="questionOptionOne"
                maxLength="100"
                placeholder="First Option"
              />
              <p> OR </p>
              <input
              onChange={this.handleChange}
              id="questionOptionTwo"
              type="text"
              name="questionOptionTwo"
              maxLength="100"
              placeholder="Sec. Option"
              />
              <input  id="submit" type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      );
    }
  }
}


export default connect()(AddNewQuestion);
