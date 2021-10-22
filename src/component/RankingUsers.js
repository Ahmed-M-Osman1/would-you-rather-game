import React from "react";
import Card from "@mui/material/Card";
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';

export default function RankingUsers(props) {
  const { name, answers, questions, score, avatarURL } = props.winner;
  return (
    <div>
      <div>
      <Card
      sx={{ width: "600px", textAlign: "center" }}
      style={{
        marginLeft: "25%",
        marginTop: "6.3%",
        overflow: "hidden",
      }}
    >
        <div>
          <img style={{
            width: "200px",
            height: "200px",
            display: "flex",
            marginRight: "auto",
            float: "left",
          }}
          alt="avatar pic"
          src={avatarURL} />
        </div>
        <div>
          <p style={{ color: '#1a237e', fontWeight: "bold" , fontSize: "26px"}}>{name}</p> 
          <div>
            <p>Number Of Asked Questions: {questions.length} </p> 
          </div>
          <div>
            <p>Number Of Answered Questions: {Object.keys(answers).length}</p>
          </div>
        </div>
        <div>
          <p style={{ color: '#009688', fontWeight: "bold" , fontSize: "26px"}} ><SportsScoreOutlinedIcon/> Score : {score} </p>
        </div>
        </Card>
      </div>
    </div>
  );
}
