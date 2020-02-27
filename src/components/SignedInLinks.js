import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/notebook" className="white-text">
          Notebook
        </NavLink>
      </li>
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
    </ul>
  );
};

export default SignedInLinks;
