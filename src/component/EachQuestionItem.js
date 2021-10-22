import React, { Component } from "react";
import {
  Link,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import Filter2OutlinedIcon from '@mui/icons-material/Filter2Outlined';
import { Button } from "@material-ui/core";

class EachQuestionItem extends Component {
  render() {
    const { optionOne, optionTwo, id, type } = this.props.question;

    const { user } = this.props;
    return (
      <div>
        <Card
          sx={{ width: "600px", textAlign: "center" }}
          style={{
            marginLeft: "25%",
            marginTop: "7.2%",
            overflow: "hidden",
          }}
        >
          <div>
            <div>
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  marginRight: "auto",
                  float: "left",
                }}
                alt="avatar pic"
                src={user.avatarURL}
              />
            </div>
            <div style={{ margin: 0 }} > 
            <p style={{ color: '#1a237e', fontWeight: "bold" , fontSize: "26px"}} >{user.name} Ask:</p>
            <p style={{ textAlign: "center" , fontSize: 14, color: '#01579b'}} > Would You Rather: </p>
            </div>
          </div>
          <div>
            <div />
            <div>
              <label><Filter1OutlinedIcon /> {optionOne.text}</label>
              <br/>
              <label><Filter2OutlinedIcon/> {optionTwo.text}</label>
              <br />
              <Link style={{ textDecoration: 'none' }} to={`/question/${id}`}>
                <Button variant="contained" style={{ margin: '5px 0' ,backgroundColor: "#42a5f5", }}>
                  {type === "unansweredQ"
                    ? "Answer this Question"
                    : "View Results"}
                    </Button>
              </Link>
            </div>
          </div>
        </Card>
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

export default withRouter(connect(mapStateToProps)(EachQuestionItem));
