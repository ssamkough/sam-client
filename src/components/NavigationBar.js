import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import SignedInLinks from "./navbar/SignedInLinks";

const NavigationBar = props => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : "logged_out";
  if (links !== "logged_out") {
    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="text-white">
          sc
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {links}
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="text-white">
          sc
        </Navbar.Brand>
      </Navbar>
    );
  }
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(NavigationBar);
