import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { login } from "./../store/actions/authActions";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col>
            <h4>Login</h4>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={this.handleChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        {authError ? (
          <Row>
            <Col className="text-center">
              <h4>
                <Badge variant="danger">{authError}</Badge>
              </h4>
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
