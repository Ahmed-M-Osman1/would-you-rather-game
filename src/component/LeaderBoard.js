import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RankingUsers from "./RankingUsers";

class LeaderBoard extends Component {
  render() {
    const { winners } = this.props;
    return (
      <div>
      
        {winners.map((winner) => (
          <RankingUsers key={winner.id} winner={winner} />
        ))}
       
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  winners: PropTypes.array.isRequired,
};

function mapStateToProps({ users }) {
  // we can calculate the score by add answers+Q but the answers are object so  
  const winners = Object.values(users).map((winner) =>
        Object.assign({}, winner, {
          score: Object.keys(winner.answers).length + winner.questions.length,
        }) // I create a new attribute, call it score and assign it the sum of the points
    )
    .sort((a, b) => b.score - a.score);

  return {
    winners,
  };
}

export default connect(mapStateToProps)(LeaderBoard);