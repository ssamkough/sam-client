import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ServiceList from "./../../components/services/ServiceList";

class Services extends Component {
  render() {
    const { services, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col md={10}>
            <ServiceList services={services} />
          </Col>
          <Col md={2}>
            <Button
              as={NavLink}
              to="/addservice"
              variant="outline-dark"
              size="md"
              className="add-entity"
            >
              Add Service
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.firestore.ordered.services,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "services", orderBy: ["created_at", "desc"] }
  ])
)(Services);
