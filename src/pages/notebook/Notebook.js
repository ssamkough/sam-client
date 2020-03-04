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

import PostList from "./../../components/notebook/PostList";

class Notebook extends Component {
  render() {
    const { posts, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col md={10}>
            <PostList posts={posts} />
          </Col>
          <Col md={2}>
            <Button
              as={NavLink}
              to="/addpost"
              variant="outline-dark"
              size="lg"
              className="add-entity"
            >
              Add Post
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.notebook,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "notebook", orderBy: ["created_at", "desc"] }
  ])
)(Notebook);
