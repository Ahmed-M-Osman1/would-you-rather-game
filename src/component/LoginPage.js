import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {setAuthedUser} from '../action/AuthedUser'
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

class LoginPage extends Component {


  handleSignIn = () => {
    const { dispatch } = this.props;
    const selectedUser = document.getElementById("users");

    console.log(selectedUser);
    dispatch(setAuthedUser(selectedUser.value));
  };

  render() {
    return (
      <div>
      <Card sx={{ maxWidth: 500 }}
      style={{
        position: "absolute",
        left: "20%",
        top: "20%",
      }}
      >
        <div >

        <Typography sx={{ textAlign: "center" , fontSize: 14, color: '#01579b'}}>
        <h2>Welcome to WOULD YOU RATHER game</h2>
        <p>This Game is simple. You should Choose between 2 different option</p>
        <p>Please Choose one of the characters to start</p>
        </Typography>
          
        </div>
          <span id="login-form">
            <select id="users">
              {this.props.allUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button id="sign-in" onClick={this.handleSignIn}>
              Sign In
            </button>
          </span>
          </Card>
        </div>
    );
  }
}

LoginPage.propTypes = {
  authedUser: PropTypes.string.isRequired,
  allUsers: PropTypes.array.isRequired,
};

function mapStateToProps({ users, authedUser }) {
  const allUsers = Object.values(users).map((user) => {
    return { id: user.id, name: user.name};
  });
  return {
    allUsers,
    authedUser,
  };
}
export default withRouter(connect(mapStateToProps)(LoginPage));