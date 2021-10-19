import PropTypes from "prop-types";
import React, { Component } from "react";
import { handleAnswerQuestion } from "../action/Question";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";

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
    switch (this.props.not_found) {
      case true :
        return <Redirect to="/not-found" />
      case false :
    const { user, authedUser, isTheQAnswered, question } = this.props;
    const { optionOne, optionTwo } = question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

      return (
        <Link to={`/questions/${question.id}`}>
        <div>
        <div>
          <div>
            <img alt="avatar" src={user.avatarURL} />
          </div>
          <div>
            {isTheQAnswered ? (
              <form>
                <div>
                <div></div>
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
                      }}
                    >
                    </div>
                  </div>
                  <label>{`${optionOne.votes.length} Out Of ${totalVotes}`}</label>
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
                  <div>{`${optionTwo.votes.length} Out Of ${totalVotes}`}</div>
                </div>
              </form>
            ) : (
              <form onSubmit={this.handleSubmit}>
              <div></div>
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
      </Link>
    );
  }
}}



function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.questiondID;
  const question = questions[id];
  let isTheQAnswered = true;
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
      isTheQAnswered = true;
    }
  }
  const user = users[question.author];
  return {
    question,
    user,
    isTheQAnswered,
    authedUser,
  };
}

QuestionsPage.propTypes = {
  questions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isTheQAnswered: PropTypes.bool.isRequired,
  authedUser: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(QuestionsPage));
