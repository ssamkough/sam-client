import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { logout } from "../../store/actions/authActions";

const SignedInLinks = props => {
  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link as={NavLink} to="/" className="text-white">
          Dashboard
        </Nav.Link>
        <Nav.Link as={NavLink} to="/notebook" className="text-white">
          Notebook
        </Nav.Link>
        <Nav.Link as={NavLink} to="/projects" className="text-white">
          Projects
        </Nav.Link>
        <Nav.Link as={NavLink} to="/services" className="text-white">
          Services
        </Nav.Link>
        <Nav.Link as={NavLink} to="/articles" className="text-white">
          Articles
        </Nav.Link>
        <Nav.Link as={NavLink} to="/people" className="text-white">
          People
        </Nav.Link>
        <Nav.Link onClick={props.logout} className="text-white">
          Log Out
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
