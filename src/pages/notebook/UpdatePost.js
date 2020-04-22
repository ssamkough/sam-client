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

import { updatePost } from "./../../store/actions/postActions";

class UpdatePost extends Component {
  state = {
    path: "",
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
    this.props.updatePost(this.state);
    this.props.history.push("/notebook");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.post.path,
        title: props.post.title,
        content: props.post.content,
        helpers: props.post.helpers,
        tags: props.post.tags,
      }));
    }
  }

  render() {
    const { auth, post } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (post) {
      return (
        <Container>
          <br></br>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <h4>Update Post</h4>
                <Form.Group controlId="path">
                  <Form.Label>Path</Form.Label>
                  <Form.Control disabled value={post.path} />
                </Form.Group>

                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control disabled value={post.title} />
                </Form.Group>
                <Form.Group controlId="helpers">
                  <Form.Label>
                    Helpers (separate w/ commas (don't put spaces))
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Helpers (separate w/ commas (don't put spaces))"
                    onChange={this.handleChange}
                    defaultValue={post.helpers}
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
                    defaultValue={post.tags}
                  />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="10"
                    type="text"
                    placeholder="Content"
                    onChange={this.handleChange}
                    defaultValue={post.content}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Update Post
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
            <Col>Loading post...</Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const posts = state.firestore.data.notebook;
  const post = posts ? posts[path] : null;

  return {
    post: post,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "notebook" }])
)(UpdatePost);
