import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { addPerson } from "../../store/actions/personActions";

class AddPerson extends Component {
  state = {
    first_name: "",
    last_name: "",
    link: "",
    description: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPerson(this.state);
    this.props.history.push("/people");
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
              <h4>Add Project</h4>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="link">
                <Form.Label>Link</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="dark" type="submit">
                Add Project
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
    addPerson: person => dispatch(addPerson(person))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson);
