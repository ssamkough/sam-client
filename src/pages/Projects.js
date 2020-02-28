import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import ProjectList from "../components/projects/ProjectList";

class Projects extends Component {
  render() {
    const { projects, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s10 m10 l10">
            <ProjectList projects={projects} />
          </div>
          <div className="col s2 m2 l2">
            <NavLink to="/addproject">
              <button className="add-entity btn black lighten-1 z-depth-0 ">
                Add Project<i className="material-icons right">send</i>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["created_at", "desc"] }
  ])
)(Projects);
