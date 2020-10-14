import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { updateProject } from "./../../store/actions/projectActions";

class UpdateProject extends Component {
  state = {
    path: "",
    title: "",
    content: "",
    url: "",
    tags: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateProject(this.state);
    this.props.history.push("/projects");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.project.path,
        title: props.project.title,
        content: props.project.content,
        url: props.project.url,
        tags: props.project.tags
      }));
    }
  }

  render() {
    const { auth, project } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (project) {
      return (
        <Container>
          <br></br>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <h4>Update Project</h4>
                <Form.Group controlId="path">
                  <Form.Label>Path</Form.Label>
                  <Form.Control disabled value={project.path} />
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control disabled value={project.title} />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={project.content}
                  />
                </Form.Group>
                <Form.Group controlId="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={project.url}
                  />
                </Form.Group>
                <Form.Group controlId="tags">
                  <Form.Label>Tags (separate w/ commas)</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={project.tags}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Update Project
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>
            <Col>Loading project...</Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[path] : null;

  return {
    project: project,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: project => dispatch(updateProject(project))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(UpdateProject);
