import PropTypes from "prop-types";
import React, { Component } from "react";
import { handleAnswerQuestion } from "../action/Question";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";

class QuestionsPage extends Component {
  state = {
    SelectedOption: "Nothing_selected",
  };

  voteCalculation = (votes, totalVotes) => {
    return Math.round((votes / totalVotes) * 100);
  };

  handleChange = (event) => {
    const element = event.target;
    this.setState({ SelectedOption: element.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, question } = this.props;
    dispatch(handleAnswerQuestion(question.id, this.state.SelectedOption));
  };

  render() {
    if (this.props.not_found) {
      return <Redirect to="/not-found" />;
    }

    const { optionOne, optionTwo } = question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const { user, answered, authedUser, question } = this.props;
    return (
      <div className="question color-primary">
        <div className="question-header">
        </div>
        <div className={`item-content${answered ? " answer-content" : ""}`}>
          <div className="content-image">
            <img alt="avatar" src={user.avatarURL} />
          </div>
          <div className="content-text">
            <p className="would-you">
              {answered ? "Would You Rather" : "Results"}
            </p>
            {answered ? (
              <form>
                <div
                  className={`answer-section${
                    question.optionOne.votes.includes(authedUser)
                      ? " chosen-answer"
                      : ""
                  }`}
                >
                  <label>{optionOne.text}</label>
                  <div
                    data-label={`${this.voteCalculation(
                      optionOne.votes.length,
                      totalVotes
                    )} % Complete`}
                  >
                    <div
                      style={{
                        width:
                          this.voteCalculation(
                            optionOne.votes.length,
                            totalVotes
                          ) + " % ",
                      }}>
                      {console.log(3)}
                    </div>
                  </div>
                  <label className="choice-percentage">{`${optionOne.votes.length} Out Of ${totalVotes}`}</label>
                </div>
                <div
                  className={`answer-section${
                    question.optionTwo.votes.includes(authedUser)
                      ? " chosen-answer"
                      : ""
                  }`}
                >
                  <label>{optionTwo.text}</label>
                  <div
                    data-label={`${this.voteCalculation(
                      optionTwo.votes.length,
                      totalVotes
                    )} % Complete`}
                  >
                    <div
                      style={{
                        width:
                          this.voteCalculation(
                            optionTwo.votes.length,
                            totalVotes
                          ) + " % ",
                      }}
                    ></div>
                  </div>
                  <div className="choice-percentage">{`${optionTwo.votes.length} Out Of ${totalVotes}`}</div>
                </div>
              </form>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <input
                  type="radio"
                  id="optionOne"
                  name="option"
                  value="optionOne"
                  onChange={this.handleChange}
                  defaultChecked
                />
                <label htmlFor="optionOne">{optionOne.text}</label>
                <input
                  type="radio"
                  id="optionTwo"
                  name="option"
                  value="optionTwo"
                  onChange={this.handleChange}
                />
                <label htmlFor="optionTwo">{optionTwo.text}</label>
                <input type="submit" value="Submit Vote" className="voteBtn" />
              </form>
              
            )}
          </div>
        </div>
      </div>
      
    );
  }
}

QuestionsPage.propTypes = {
  question: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  answered: PropTypes.bool.isRequired,
  authedUser: PropTypes.string.isRequired,
};

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.questiondID;
  const question = questions[id];
  let answered = false;
  const not_found = true;
  if (question === undefined) {
    return {
      not_found,
    };
  } else {
    if (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    ) {
      answered = true;
    }
  }
  const user = users[question.author];
  return {
    question,
    user,
    answered,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionsPage));
