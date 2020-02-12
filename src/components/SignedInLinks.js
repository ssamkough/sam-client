import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/addpost" className="white-text">
          Add Post
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="white-text">
          Log Out
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating white black-text">
          Initials
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
