import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { addService } from "../../store/actions/serviceActions";

class AddService extends Component {
  state = {
    title: "",
    content: "",
    tags: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addService(this.state);
    this.props.history.push("/services");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <h4>Add Service</h4>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="tags">
                <Form.Label>Tags (separate w/ commas)</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Add Service
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addService: service => dispatch(addService(service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddService);
