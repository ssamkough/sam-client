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

import ProjectList from "./../../components/projects/ProjectList";

class Projects extends Component {
  render() {
    const { projects, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col md={10}>
            <ProjectList projects={projects} />
          </Col>
          <Col md={2}>
            <Button
              as={NavLink}
              to="/addproject"
              variant="outline-dark"
              size="md"
              className="add-entity"
            >
              Add Project
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
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
