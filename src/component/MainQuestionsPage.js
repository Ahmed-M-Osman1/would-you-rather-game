import React, { Component } from "react";
import ListOfQuestions from "./ListOfQuestions";
import PropTypes from "prop-types";
import { Route, withRouter, Switch, Redirect, BrowserRouter } from "react-router-dom";
import QuestionsNav from "./QuestionsNav";
import { connect } from "react-redux";

class MainQuestionsPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <div className="questions">
              <QuestionsNav />
              <Switch>
                <Route exact path="/questions">
                  <Redirect to="questions/unanswered" />
                </Route>
                <Route path="/questions/answered">
                  <ListOfQuestions questions={this.props.theAnsweredQuestion} />
                </Route>
                <Route path="/questions/unanswered">
                  <ListOfQuestions
                    questions={this.props.theUnAnsweredQuestions}
                  />
                </Route>
              </Switch>
            </div>
            
          </div>
        </React.Fragment>
      </BrowserRouter>
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

export default withRouter(connect(mapStateToProps)(MainQuestionsPage));
