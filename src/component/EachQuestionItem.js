import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EachQuestionItem extends Component {
  render() {
    const {  optionOne, optionTwo, id, type } = this.props.question;

    const { user } = this.props;
    return (
      <div>
        <div>
          <p>{user.name} Ask: Would You Rather</p>
        </div>
        <div>
          <div>
            <img alt="avatar pic" src={user.avatarURL} />
          </div>
          <div/>
          <div>
            <label>{optionOne.text}</label>
            <label>{optionTwo.text}</label>
            <NavLink to={`/questions/${id}`}>
              <button>{type === "unansweredQ" ? "Answer this Question" : "View Results"}</button>
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
