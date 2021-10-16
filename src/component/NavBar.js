import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName>
            Main Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" exact activeClassName>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" exact activeClassName>
            Leader board
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
