import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../action/AuthedUser";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


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

        <ButtonGroup variant="contained" style={{ color: "#eceff1" , backgroundColor : "#bbdefb", textAlign: "center", position: "absolute", left: "20%", top: "5%", width: "800px" }}>
        <Link style={{ textDecoration: 'none' }} to="/questions"><Button> Home Page </Button></Link>
        <Link style={{ textDecoration: 'none' }} to="/add"><Button> New Question </Button></Link>
        <Link style={{ textDecoration: 'none' }} to="/leaderboard" ><Button>Leader board</Button></Link>

        <Typography style={{ color: 'red' , display: 'flex', marginLeft: "auto" }}>
        Hello, {signOut ? "Please Login" : " Welcome back " + user.name} 
        <Avatar alt="Remy Sharp" src={signOut ? null : user.avatarURL} />
        </Typography>
        <Link style={{ textDecoration: 'none' }} to="/questions"> <Button style={{ color: "#eceff1" ,backgroundColor : "#b71c1c" }} onClick={this.handleSignOutCLick}>Sign Out</Button></Link>
        </ButtonGroup>
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
