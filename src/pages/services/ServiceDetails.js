import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ServiceDetails = props => {
  const { service, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (service) {
    return (
      <Container>
        <br />
        <Row className="justify-content-center">
          <Col md={8}>
            <h3>{service.title}</h3>
            <div>{service.content}</div>
            <hr />
            <div>
              {service.tags &&
                service.tags.map(tag => {
                  return (
                    <span service-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </div>
            <div>{service.date}</div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading service...</p>
          </Col>
        </Row>
      </Container>
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
