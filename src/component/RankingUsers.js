import PropTypes from "prop-types";
import React from "react";

export default function RankingUsers(props) {
  const { name, answers, questions, score, avatarURL } = props.winner;
  return (
    <div>
      <div>
        <div>
          <img alt="avatar" src={avatarURL} />
        </div>
        <div>
          <p>{name}</p>
          <div>
            <p>Number Of Asked Questions:</p>
            <p>{questions.length}</p>
          </div>
          <div>
            <p>Number Of Answered Questions:</p>
            <p>{Object.keys(answers).length}</p>
          </div>
        </div>
        <div>
          <div>Score</div>
          <div>{score}</div>
        </div>
      </div>
    </div>
  );
}
