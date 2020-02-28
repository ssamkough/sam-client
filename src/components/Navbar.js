import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./navbar/SignedInLinks";
import SignedOutLinks from "./navbar/SignedOutLinks";

const Navbar = props => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="nav-wrapper black white-text">
      <div className="container">
        <Link to="/" className="brand-logo white-text">
          <b>sc</b>
        </Link>
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
