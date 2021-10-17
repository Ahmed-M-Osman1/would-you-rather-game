
import React from "react";
import PropTypes from "prop-types";

export default function UserData(props) {
  const { name, answers, questions, score, avatarURL } = props.userData;
  return (
    <div className="player">
      <div className="player-content">
        <div className="content-text">
          <p className="player-name">{name}</p>
          <div className="player-stats">
            <p>Number Of Questions:</p>
            <p>{questions.length}</p>
          </div>
          <div className="player-stats">
            <p>Number Of Answers:</p>
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