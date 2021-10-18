import PropTypes from "prop-types";
import React from "react";

export default function RankingUsers(props) {
  const { name, answers, questions, score, avatarURL } = props.winner;
  return (
    <div className="player">
      <div className="player-content">
        <div className="player-image">
          <img alt="avatar" src={avatarURL} />
        </div>
        <div className="content-text">
          <p className="player-name">{name}</p>
          <div className="player-stats">
            <p>Number Of Asked Questions:</p>
            <p>{questions.length}</p>
          </div>
          <div className="player-stats">
            <p>Number Of Answered Questions:</p>
            <p>{Object.keys(answers).length}</p>
          </div>
        </div>
        <div className="total-score">
          <div className="total-score-header">Score</div>
          <div className="score-circle">{score}</div>
        </div>
      </div>
    </div>
  );
}

RankingUsers.propTypes = {
  winner: PropTypes.array.isRequired,
};