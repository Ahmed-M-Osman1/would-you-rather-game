import React, { Component } from "react";
import { connect } from "react-redux";
import UserData from './User'

class Leaderboard extends Component {
  render() {
    const { userData } = this.props;
    return (
      <div className="leaderboard">
        {UserData.map((user) => (
          <UserData key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  // The answers are saved as an object. However, the questions are saved as an array
  // So we need to approach them in different ways to calculate the total score
  const players = Object.values(users)
    .map(
      (player) =>
        Object.assign({}, player, {
          score: Object.keys(player.answers).length + player.questions.length,
        }) // I create a new attribute, call it score and assign it the sum of the points
    )
    .sort((a, b) => b.score - a.score);

  return {
    players,
  };
}

export default connect(mapStateToProps)(Leaderboard);