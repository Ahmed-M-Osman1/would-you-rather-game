import { NavLink } from "react-router-dom";
import React from "react";

// just one easy function.
export default function NotFound() {
  return (
    <div>
    <p> 404. Page Not Found </p>
      <NavLink to="/">
        <button> Go to Main Page </button>
      </NavLink>
    </div>
  );
}
