import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProjectDetails = props => {
  const { project, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (project) {
    return (
      <Container>
        <br />
        <Row className="justify-content-center">
          <Col md={8}>
            <h3>{project.title}</h3>
            <div>{project.content}</div>
            <hr />
            <div>
              {project.tags &&
                project.tags.map(tag => {
                  return (
                    <span project-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </div>
            <div>{project.date}</div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading project...</p>
          </Col>
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[path] : null;
  return {
    project: project,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
