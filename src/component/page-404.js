import { Link } from "react-router-dom";
import React from "react";
import p404 from '../img/p404.png'
import { Button } from "@material-ui/core";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// just one easy function.
export default function NotFound() {
  return (
    <div>
    {/** This is pixar 404 page. I screenshot it. */}
    <img style={{ marginLeft: "20%",
    marginTop: "6.3%",
    width: "700px", height: "400px" 

}} src={p404}/>
<br/>
      <Link style={{ textDecoration: 'none' }} to="/">
        <Button style={{
          margin: "3%",
          borderRadius: 35,
          backgroundColor: "#00bcd4",
          color: 'white',
          padding: "2px 10px",
          marginLeft: "45%",
        }}
        > <HomeOutlinedIcon /> Go to Home Page <HomeOutlinedIcon /> </Button>
      </Link>
    </div>
  );
}
