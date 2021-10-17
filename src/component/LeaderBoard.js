import React, { Component } from "react";
import { connect } from "react-redux";
import UserData from './User'

class LeaderBoard extends Component {
  render() {
    const { UserData } = this.props;
    return (
      <div className="leaderboard">
        {UserData.map((user) => (
          <div>
                  <div className="content-text">
                    <p className="player-name">{user.name}</p>
                    <div className="player-stats">
                      <p>Number Of Questions:</p>
                      <p>{user.questions.length}</p>
                    </div>
                    <div className="player-stats">
                      <p>Number Of Answers:</p>
                      <p>{user.keys.length}</p>
                    </div>
                  </div>
                  <div className="total-score">
                    <div className="total-score-header">Score</div>
                    <div className="score-circle">{}</div>
                  </div>
                </div>
            ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  // we can calculate the score by add answers+Q but the answers are object so  
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

export default connect(mapStateToProps)(LeaderBoard);