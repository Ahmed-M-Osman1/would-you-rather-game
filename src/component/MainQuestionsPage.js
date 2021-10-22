import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EachQuestionItem from "./EachQuestionItem";
import { Button } from "@material-ui/core";
import ButtonGroup from '@mui/material/ButtonGroup';

class MainQuestionsPage extends Component {
  state = {
    displayUnanswered: true,
  };

  handleSortingAnsweredQuestion = () => {
    return this.setState({ displayUnanswered: false })
  };

  handleSortingUnansweredQuestion = () => {
    return this.setState({ displayUnanswered: true });
  };


  render() {
    return (
      <React.Fragment>
        <div>
          <div style={{ backgroundColor: "#42a5f5", position: 'absolute', marginLeft: '35%', marginTop: '-0.7%'}}>
          <ButtonGroup >
          <Button variant="contained" onClick={this.handleSortingAnsweredQuestion} >
              Answered Questions
            </Button>
            <Button variant="contained" onClick={this.handleSortingUnansweredQuestion}>
              Unanswered Questions
            </Button>
            </ButtonGroup>
            </div>
            <div>
              {this.state.displayUnanswered ? (
                <div className="centered">
                  {this.props.theUnAnsweredQuestions.map((question) => (
                    <EachQuestionItem key={question.id} question={question} />
                  ))}
                </div>
              ) : (
                <div>
                  {this.props.theAnsweredQuestion.map((question) => (
                    <EachQuestionItem key={question.id} question={question} />
                  ))}
                </div>
              )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

MainQuestionsPage.propTypes = {
  theUnAnsweredQuestions: PropTypes.array.isRequired,
  theAnsweredQuestion: PropTypes.array.isRequired,
};

function mapStateToProps({ questions, users, authedUser }) {
  //pull out keys of the answers.
  const userAnsweredQuestions = Object.keys(users[authedUser].answers);

  // Filter out the answered Questions.
  const theAnsweredQuestion = Object.values(questions)

    .filter((question) => userAnsweredQuestions.includes(question.id)) // check for the the id exist in the user answered id.
    .map((question) => Object.assign({}, question, { type: "answeredQ" })) //Add Type to the object to used for sort.
    .sort((a, b) => b.timestamp - a.timestamp); //Sort the answers with the time stamp
  // Filter out the unAnswered questions. (repeat the previous)

  const theUnAnsweredQuestions = Object.values(questions)
    .filter((question) => !userAnsweredQuestions.includes(question.id))
    .map((question) => Object.assign({}, question, { type: "unansweredQ" }))
    .sort((a, b) => b.timestamp - a.timestamp); //Sort the answers with the time stamp
  return {
    theAnsweredQuestion,
    theUnAnsweredQuestions,
  };
}

export default connect(mapStateToProps)(MainQuestionsPage);
