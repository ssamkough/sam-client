import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import PersonList from "./../../components/people/PersonList";

class People extends Component {
  render() {
    const { people, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s10 m10 l10">
            <PersonList people={people} />
          </div>
          <div className="col s2 m2 l2">
            <NavLink to="/addperson">
              <button className="add-entity btn black lighten-1 z-depth-0 ">
                Add Person<i className="material-icons right">send</i>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.firestore.ordered.people,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "people", orderBy: ["created_at", "desc"] }])
)(People);
