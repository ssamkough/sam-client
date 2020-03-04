import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/actions/authActions";

const HamburgerSignedInLinks = props => {
  return (
    <ul className="sidenav" id="hamburger-menu">
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
        <NavLink to="/projects" className="white-text">
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className="white-text">
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/articles" className="white-text">
          Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/people" className="white-text">
          People
        </NavLink>
      </li>
      <li>
        <button className="black white-text href-button" onClick={props.logout}>
          Log Out
        </button>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(HamburgerSignedInLinks);