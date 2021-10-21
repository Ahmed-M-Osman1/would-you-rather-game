import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../action/AuthedUser";
import Leaderboard from './LeaderBoard'

class NavBar extends Component {
  // sign out click
  handleSignOutCLick = () => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser("No_Active_user"));
  };
  render() {
    const { signOut, user } = this.props;
    return (
      <div>
        <ul>
          <NavLink to="/questions">
            Main Page
          </NavLink>
          <NavLink to="/add">New Question</NavLink>
          <NavLink to="/leaderboard" >Leader board</NavLink>
          <li>
          Hello, {signOut ? "Please Login" : " Welcome back " + user.name}
            
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
  if (authedUser === "No_Active_user") {
    signOut = true;
  }
  return {
    user,
    signOut,
  };
}

export default connect(mapStateToProps)(NavBar);
