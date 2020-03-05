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

import PersonList from "./../../components/people/PersonList";

class People extends Component {
  render() {
    const { people, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col md={10}>
            <PersonList people={people} />
          </Col>
          <Col md={2}>
            <Button
              as={NavLink}
              to="/addperson"
              variant="outline-dark"
              size="md"
              className="add-entity"
            >
              Add Person
            </Button>
          </Col>
        </Row>
      </Container>
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
