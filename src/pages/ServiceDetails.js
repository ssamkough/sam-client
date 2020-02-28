import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const ServiceDetails = props => {
  const { service, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (service) {
    return (
      <div className="container section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{service.title}</span>
            <p>{service.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>{service.tags}</div>
            <div>{service.date}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading service...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const services = state.firestore.data.services;
  const service = services ? services[path] : null;
  return {
    service: service,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "services" }])
)(ServiceDetails);
