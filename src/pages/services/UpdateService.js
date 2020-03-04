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

import { updateService } from "./../../store/actions/serviceActions";

class UpdateService extends Component {
  state = {
    path: "",
    title: "",
    content: "",
    tags: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateService(this.state);
    this.props.history.push("/services");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.service.path,
        title: props.service.title,
        content: props.service.content,
        tags: props.service.tags
      }));
    }
  }

  render() {
    const { auth, service } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (service) {
      return (
        <Container>
          <br></br>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <h4>Update Service</h4>
                <Form.Group controlId="path">
                  <Form.Label>Path</Form.Label>
                  <Form.Control disabled value={service.path} />
                </Form.Group>

                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control disabled value={service.title} />
                </Form.Group>

                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Content"
                    onChange={this.handleChange}
                    defaultValue={service.content}
                  />
                </Form.Group>
                <Form.Group controlId="tags">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tags (separate w/ commas)"
                    onChange={this.handleChange}
                    defaultValue={service.tags}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Update Service
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
            <Col>Loading service...</Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const services = state.firestore.data.services;
  const service = services ? services[path] : null;

  return {
    service: service,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateService: service => dispatch(updateService(service))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "services" }])
)(UpdateService);
