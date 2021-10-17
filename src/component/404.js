import React from "react";
import { NavLink } from "react-router-dom";

// just one easy function.
export default function NotFound() {
  return (
    <div>
      <NavLink to="/">
        <button id="returnHome"> Go to home </button>
      </NavLink>
    </div>
  );
}
