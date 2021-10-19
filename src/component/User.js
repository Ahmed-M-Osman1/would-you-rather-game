
import React from "react";


export default function UserData(props) {
  const { name, answers, questions, score, avatarURL } = props.userData;
  return (
    <div>
      <div>
        <div>
          <p>{name}</p>
          <div>
            <p>Number Of Questions:</p>
            <p>{questions.length}</p>
          </div>
          <div>
            <p>Number Of Answers:</p>
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