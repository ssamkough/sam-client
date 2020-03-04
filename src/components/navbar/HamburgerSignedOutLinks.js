import React from "react";
import { NavLink } from "react-router-dom";

const HamburgerSignedOutLinks = () => {
  return (
    <ul id="hamburger-menu" className="sidenav">
      <li>
        <NavLink to="/login" className="white-text">
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default HamburgerSignedOutLinks;
