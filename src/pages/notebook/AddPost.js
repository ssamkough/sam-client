import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { addPost } from "../../store/actions/postActions";

class AddPost extends Component {
  state = {
    title: "",
    content: "",
    helpers: "",
    tags: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addPost(this.state);
    this.props.history.push("/notebook");
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
              <h4>Add Post</h4>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="helpers">
                <Form.Label>
                  Helpers (separate w/ commas (don't put spaces))
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Helpers (separate w/ commas (don't put spaces))"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="tags">
                <Form.Label>
                  Tags (separate w/ commas (don't put spaces))
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tags (separate w/ commas (don't put spaces))"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  type="text"
                  placeholder="Content"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="dark" type="submit">
                Add Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
