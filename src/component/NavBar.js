import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../action/AuthedUser";
import Leaderboard from './LeaderBoard'

class NavBar extends Component {
  // sign out click
  handleSignOutCLick = () => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser("SIGN_OUT"));
  };
  render() {
    const { signOut, user } = this.props;
    return (
      <div className="tab-navigation">
        <ul className="tab-menu">
          <NavLink exact to="/poll">
            Main Page
          </NavLink>
          <NavLink to="/add">New Question</NavLink>
          <NavLink to="/leaderboard" component={Leaderboard}>Leader board</NavLink>
          <li>
            Hello, {signOut ? "Please Login" : "user.name"}
            <div>
              <button onClick={this.handleSignOutCLick}>Sign Out</button>
            </div>
            <div></div>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];
  let signOut = false;
  if (authedUser === "LOGGED_OUT") {
    signOut = true;
  }
  return {
    user,
    signOut,
  };
}

export default connect(mapStateToProps)(NavBar);
