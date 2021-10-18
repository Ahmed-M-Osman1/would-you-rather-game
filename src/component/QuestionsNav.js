import { NavLink } from "react-router-dom";
import React, { Component } from "react";


class QuestionsNav extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="unanswered">
          <p>Unanswered Questions</p>
        </NavLink>
        <NavLink exact to="answered">
          <p>Answered Questions</p>
        </NavLink>
      </div>
    );
  }
}

export default QuestionsNav;