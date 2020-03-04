import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="right hide-on-med-and-down">
      <li>
        <NavLink to="/login" className="white-text">
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
