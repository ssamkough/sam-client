import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const PersonDetails = props => {
  const { person, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (person) {
    return (
      <div className="container section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{person.title}</span>
            <p>{person.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>{person.tags}</div>
            <div>{person.date}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading person...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const people = state.firestore.data.people;
  const person = people ? people[path] : null;
  return {
    person: person,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "people" }])
)(PersonDetails);
