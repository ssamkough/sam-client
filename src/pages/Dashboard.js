import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import Notifications from "./../components/Notifications";

class Notebook extends Component {
  render() {
    const { auth, notifications } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="dashboard container">
        <br></br>
        <div className="row">
          <div className="col s4 m4 l4">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.notebook,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "notebook" },
    { collection: "notifications", limit: 5, orderBy: ["created_at", "desc"] }
  ])
)(Notebook);
