import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./navbar/SignedInLinks";
import SignedOutLinks from "./navbar/SignedOutLinks";
import HamburgerSignedInLinks from "./navbar/HamburgerSignedInLinks";
import HamburgerSignedOutLinks from "./navbar/HamburgerSignedOutLinks";

const Navbar = props => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  const hamburgerLinks = auth.uid ? (
    <HamburgerSignedInLinks />
  ) : (
    <HamburgerSignedOutLinks />
  );

  return (
    <div className="nav-container">
      <nav className="nav-wrapper black white-text">
        <div className="container">
          <Link to="/" className="brand-logo white-text left">
            <b>sc</b>
          </Link>
          <a
            href="#"
            className="sidenav-trigger right"
            data-target="hamburger-menu"
          >
            <i className="material-icons">menu</i>
          </a>
          {links}
        </div>
      </nav>
      {hamburgerLinks}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
