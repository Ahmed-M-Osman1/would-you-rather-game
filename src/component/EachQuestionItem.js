import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EachQuestionItem extends Component {
  render() {
    const {  optionOne, optionTwo, id, type } = this.props.question;

    const { user } = this.props;
    return (
      <div className="question">
        <div className="question-header">
          <p>{user.name} Ask: Would You Rather</p>
        </div>
        <div className="item-content poll-content">
          <div className="content-image">
            <img alt="avatar pic" src={user.avatarURL} />
          </div>
          <div className="content-seperator" />
          <div className="content-text">
            <label>{optionOne.text}</label>
            <label>{optionTwo.text}</label>
            <NavLink to={`/questions/${id}`}>
              <button className="voteBtn">{type === "unanswered" ? "View And Vote" : "View Answer"}</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

EachQuestionItem.propTypes = {
  user: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

function mapStateToProps({ users }, { question }) {
  const user = users[question.author];
  return {
    user,
  };
}

export default connect(mapStateToProps)(EachQuestionItem);
