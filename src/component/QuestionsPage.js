import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleAnswerQuestion } from "../action/Question";

class QuestionsPage extends Component {
  state = {
    SelectedOption: "Nothing_selected",
    isTheQAnswered: false,
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
    this.setState({ isTheQAnswered: true });
  };

  render() {
    const { users, authedUser, question } = this.props;
    const author = users[question.author];
    const { optionOne, optionTwo } = question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return (
      <div>
        <div>
          <p>{author.name} Ask: Would You Rather</p>
        </div>
        <div>
          <div>
            <img alt="avatar pic" src={author.avatarURL} />
          </div>
          <div />
          <div>
            <label>{optionOne.text}</label>
            <label>{optionTwo.text}</label>
            {this.state.isTheQAnswered ? (
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
    );
  }
}

QuestionsPage.propTypes = {
  question: PropTypes.object.isRequired,
};

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(QuestionsPage);