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

import { updatePerson } from "../../store/actions/personActions";

class UpdatePerson extends Component {
  state = {
    id: "",
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
    this.props.updatePerson(this.state);
    this.props.history.push("/people");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        id: props.match.params.id,
        first_name: props.person.first_name,
        last_name: props.person.last_name,
        link: props.person.link,
        description: props.person.description
      }));
    }
  }

  render() {
    const { auth, person } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (person) {
      return (
        <Container>
          <br></br>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <h4>Update Person</h4>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={person.first_name}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={person.last_name}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="link">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={person.link}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="2"
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={person.description}
                    required
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Update Person
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
            <Col>Loading person...</Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const people = state.firestore.data.people;
  const person = people ? people[id] : null;

  return {
    person: person,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePerson: person => dispatch(updatePerson(person))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "people" }])
)(UpdatePerson);
