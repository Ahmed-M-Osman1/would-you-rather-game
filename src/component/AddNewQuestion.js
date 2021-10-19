import React, { Component } from "react";
import { handleAskQuestion } from "../action/Question";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AddNewQuestion extends Component {
  // add local state for the asked Questions.
  state = {
    redirect: false,
    optionOne: "",
    optionTwo: "",
  };

// handleChange as tyler
handleChange = (event) => {
    event.preventDefault();
    const element = event.target;
    this.setState({ [element.id]: element.value });
  };


// handleSubmit as tyler
  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { optionOne, optionTwo } = this.state;

    dispatch(handleAskQuestion(optionOne, optionTwo));

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/add" />;
    } else {
      return (
        <div>
          <div>
            <p> Ask New Question </p>
          </div>
          <div>
            <h1>Would You Rather?</h1>
            <form onSubmit={this.handleSubmit}>
              <input
              onChange={this.handleChange}
                id="optionOne"
                type="text"
                name="questionOptionOne"
                placeholder="First Option"
              />
              <p> OR </p>
              <input
              onChange={this.handleChange}
              id="optionTwo"
              type="text"
              name="questionOptionTwo"
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
