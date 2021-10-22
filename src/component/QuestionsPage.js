import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { handleAnswerQuestion } from "../action/Question";
import { Button } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

class QuestionsPage extends Component {
  state = {
    SelectedOption: "optionOne",
  };

  voteCalculation = (votes, totalVotes) => {
    return Math.round((votes / totalVotes) * 100);
  };

  handleChange = (event) => {
    const element = event.target;
    this.setState({ SelectedOption: element.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, thisQuestion } = this.props;
    dispatch(handleAnswerQuestion(thisQuestion.id, this.state.SelectedOption));
  };

  render() {
    if (this.props.not_found) {
      return <Redirect to="/not-found" />;
    }

    const { authedUser, thisQuestion, askedUser } = this.props;
    const { optionOne, optionTwo } = thisQuestion;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

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
    <Typography sx={{ textAlign: "center" , fontSize: 14, color: '#01579b'}}>
          <p style={{ color: '#1a237e', fontWeight: "bold" , fontSize: "26px"}} >{thisQuestion.author} Ask: Would You Rather ? </p>
        
        <div>
          <div>
            <img style={{
              width: "200px",
              height: "200px",
              display: "flex",
              marginRight: "auto",
              float: "left",
            }} alt="avatar pic" src={askedUser.avatarURL} />
          </div>
          <div />
          <div>
            {this.props.isTheQAnswered ? (
              <form>
              <div>
                <div >
                  <div > {
                    thisQuestion.optionOne.votes.includes(authedUser) ? <DoneOutlineOutlinedIcon /> : null
                  } {optionOne.text}
                  </div>
                  <label >{`${optionOne.votes.length} Out Of ${totalVotes} ` +'('+ Math.floor((100*`${optionOne.votes.length}`)/`${totalVotes}`) +'%)'} </label>
                </div>

                <div >
                  <div > {
                    thisQuestion.optionTwo.votes.includes(authedUser) ? <DoneOutlineOutlinedIcon /> : null
                  } {optionTwo.text}
                  </div>
                  <label>{`${optionTwo.votes.length} Out Of ${totalVotes} ` +'('+ Math.floor((100*`${optionTwo.votes.length}`)/`${totalVotes}`) +'%)' }</label>
                </div>
                </div>
                <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#00897b",
                  padding: "2px 10px"
                }}
                onClick={() => {
                  this.props.history.push('/')
                }}
                endIcon={<HomeIcon />}
              >
              Go to Home Page 
              </Button>
              </form>
            ) : (
              <form>
                <div></div>
                <input
                  type="radio"
                  id="optionOne"
                  name="option"
                  value="optionOne"
                  defaultChecked
                  onChange={this.handleChange}
                />
                <label htmlFor="optionOne">{optionOne.text}</label>
                <p style={{ fontSize: '15 px', color:'#bf360c' }}> OR </p>
                <input
                  type="radio"
                  id="optionTwo"
                  name="option"
                  value="optionTwo"
                  onChange={this.handleChange}
                />
                <label htmlFor="optionTwo">{optionTwo.text}</label>
                <br/>
                <Button
                  type="submit"
                  value="Submit Vote"
                  onClick={this.handleSubmit}
                  variant="contained"
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#42a5f5",
                    padding: "2px 10px",
                    marginTop: '2%'
                  }}
                  endIcon={<SendIcon />}
                >
                Submit Vote
                </Button>
              </form>
            )}
          </div>
        </div>
        </Typography>
      </div>
      </Card>
      </div>
    );
  }
}

QuestionsPage.propTypes = {
  question: PropTypes.object.isRequired,
};

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.id;
  const thisQuestion = questions[id];
  let isTheQAnswered = false;
  const not_found = true;
  if (thisQuestion === undefined) {
    return {
      not_found,
    };
  } else {
    if (
      thisQuestion.optionOne.votes.includes(authedUser) ||
      thisQuestion.optionTwo.votes.includes(authedUser)
    ) {
      isTheQAnswered = true;
    }
  }
  const askedUser = users[thisQuestion.author];
  return {
    thisQuestion,
    askedUser,
    questions,
    isTheQAnswered,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionsPage));
