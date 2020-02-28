import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/actions/authActions";

const SignedInLinks = props => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/" className="white-text">
          Dashboard
        </NavLink>
      </li>
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
        <a onClick={props.logout}>Log Out</a>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
