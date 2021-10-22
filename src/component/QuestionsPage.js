import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { handleAnswerQuestion } from "../action/Question";

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
    const { dispatch, thisQuestion } = this.props;
    dispatch(handleAnswerQuestion(thisQuestion.id, this.state.SelectedOption));
  };

  render() {
    if (this.props.not_found) {
      return <Redirect to="/not-found" />;
    }

    const { authedUser, thisQuestion, askedUser } = this.props;
    const { optionOne, optionTwo } = thisQuestion;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return (
      <div>
        <div>
          <p>{thisQuestion.author} Ask: Would You Rather</p>
        </div>
        <div>
          <div>
            <img alt="avatar pic" src={askedUser.avatarURL} />
          </div>
          <div />
          <div>
            <label>{optionOne.text}</label>
            <label>{optionTwo.text}</label>
            {this.props.isTheQAnswered ? (
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
                    ></div>
                  </div>
                  <label>{`${optionOne.votes.length} Out Of ${totalVotes}`}</label>
                </div>
                <div
                  className={`answer-section${
                    thisQuestion.optionTwo.votes.includes(authedUser)
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
              <form>
                <div></div>
                <input
                  type="radio"
                  id="optionOne"
                  name="option"
                  value="optionOne"
                  defaultChecked
                  onChange={this.handleChange}
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
                <input type="submit" value="Submit Vote" onClick={this.handleSubmit} />
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
};


function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.id;
  const thisQuestion = questions[id];
  let isTheQAnswered = false;
  const not_found = true;
  if (thisQuestion === undefined) {
    return {
      not_found,
    };
  } else {
    if (thisQuestion.optionOne.votes.includes(authedUser) || thisQuestion.optionTwo.votes.includes(authedUser)) {
      isTheQAnswered = true;
    }
  }
  const askedUser = users[thisQuestion.author];
  return {
    thisQuestion,
    askedUser,
    questions,
    isTheQAnswered,
    authedUser,
  };
}


export default withRouter(connect(mapStateToProps)(QuestionsPage));