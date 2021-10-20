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
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <Router>
      <React.Fragment>
        {this.props.loading ? null : (
          <React.Fragment>
          <NavBar />
            <div className="outerDiv">
              {this.props.loggedOutUser ? (
                <LoginPage />
              ) : (
                <Switch>
                  <Route exact path="/">
                    <Redirect to="questions" />
                  </Route>
                  <Route exact path="/questions">
                    <MainQuestionsPage />
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
                </Switch>
              )}
              ;
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
      </Router>
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
