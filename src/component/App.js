import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { handleInitialData } from "../action/Shared";
import React, { Component } from "react";
import { connect } from "react-redux";
import MainPage from "./MainPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <MainPage />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
