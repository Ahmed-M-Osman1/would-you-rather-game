import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {setAuthedUser} from '../action/AuthedUser'
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import logo from '../img/logo.png'
import { Button } from "@material-ui/core";
import LoginIcon from '@mui/icons-material/Login';

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
      <Card sx={{ width: "800px" ,textAlign: "center" }}
      style={{
        position: "absolute",
        left: "20%",
        top: "10%",
      }}
      >
        <div >
        <h1 style={{ textAlign: "center" , fontSize: 14, color: '#01579b'}} >Welcome to WOULD YOU RATHER game</h1>
        <img style={{ width: "300px", height: "250px" }} src={logo}/>
        <p style={{ textAlign: "center" , fontSize: 14, color: '#01579b'}}>This Game is simple. You should Choose between 2 different option</p>
        <p style={{ textAlign: "center" , fontSize: 14, color: '#01579b'}}>Please Choose one of the characters to start</p>
          
        </div>
          
        <select id="users" style={{width: "150px", textAlign: "center" }}>
              {this.props.allUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <br/>
            <Button variant="contained" style={{ margin: '5px 0' ,backgroundColor: "#42a5f5", }} onClick={this.handleSignIn} startIcon={<LoginIcon />}>
              Sign In
            </Button>
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