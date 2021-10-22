import React, { Component } from "react";
import { handleInitialData } from "../action/Shared";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import LeaderBoard from "./LeaderBoard";
import QuestionsPage from "./QuestionsPage";
import LoginPage from "./LoginPage";
import NotFound from "./page-404";
import AddNewQuestion from "./AddNewQuestion";
import MainQuestionsPage from "./MainQuestionsPage";
import { connect } from "react-redux";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

class App extends Component {
// handle initial data
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <React.Fragment>
        {this.props.loading ? null : (
          <React.Fragment>
          <NavBar />
            <div className="outerDiv">
            {/** force to load the Login Page */}  
            {this.props.loggedOutUser ? (
                <LoginPage />
              ) : (
                <div>
                  <Route exact path="/">
                    <Redirect to="questions" />
                  </Route>
                  <Route path="/questions">
                    <MainQuestionsPage />
                  </Route>
                  <Route path='/question/:id'>
                  <QuestionsPage />
                  </Route>
                  <Route path="/Leaderboard">
                    <LeaderBoard />
                  </Route>
                  <Route path="/add">
                    <AddNewQuestion />
                  </Route>
                  <Route path="/not-found">
                    <NotFound />
                  </Route>
                </div>

              )}

            </div>
          </React.Fragment>

        )}

      </React.Fragment>
      
    );
  }
}

App.propTypes = {
  loggedOutUser: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    loggedOutUser: authedUser === "No_Active_user",
    loading: authedUser === null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
