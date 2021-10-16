import React, { Component } from "react";
import { connect } from "react-redux";

class MainPage extends Component {
  render() {
    return (
      <div>
        <h2> The Questions ID</h2>
        <ul>
          {this.props.questionIDs.map((id) => (
            <li key={id}>
              <div> questions ID : {id} </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, author, users }, {id} ) {
    const question = questions[id]
  return {
    questionIDs: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    author,
    users,
  };
}


export default connect(mapStateToProps)(MainPage);
