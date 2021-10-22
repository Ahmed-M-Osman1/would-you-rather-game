import React, { Component } from "react";
import { handleAskQuestion } from "../action/Question";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import logo from '../img/logo.png';
import { Button } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
class AddNewQuestion extends Component {
  // add local state for the asked Questions.
  state = {
    redirect: false,
    optionOne: "",
    optionTwo: "",
  };

// handleChange as tyler
handleChange = (event) => {
    event.preventDefault();
    const element = event.target;
    this.setState({ [element.id]: element.value });
  };


// handleSubmit as tyler
  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { optionOne, optionTwo } = this.state;

    dispatch(handleAskQuestion(optionOne, optionTwo));

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/questions" />;
    } else {
      return (
        <div>
        <Card
      sx={{ width: "600px", textAlign: "center" }}
      style={{
        marginLeft: "25%",
        marginTop: "6.3%",
        overflow: "hidden",
      }}
    >
          <div>
            <p> Ask New Question </p>
          </div>
          <div>
          <img style={{ width: "300px", height: "250px" }} src={logo}/>
          <div style={{ margin: "3%"}}>
            <form>
              <input
              onChange={this.handleChange}
                id="optionOne"
                type="text"
                name="questionOptionOne"
                placeholder="First Option"
              />
              <p> OR </p>
              <input
              onChange={this.handleChange}
              id="optionTwo"
              type="text"
              name="questionOptionTwo"
              placeholder="Sec. Option"
              />
<br/>
              <Button id="submit" type="submit" onClick={this.handleSubmit} type="submit"
              value="Submit Vote"
              onClick={this.handleSubmit}
              variant="contained"
              style={{
                margin: "3%",
                borderRadius: 35,
                backgroundColor: "#00bcd4",
                color: 'white',
                padding: "2px 10px",
              }}
              endIcon={<SendIcon />} > Submit Question </Button>
            </form>
          </div>
          </div>
          </Card>
        </div>
      );
    }
  }
}


export default connect()(AddNewQuestion);
