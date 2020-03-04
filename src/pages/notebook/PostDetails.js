import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PostDetails = props => {
  const { post, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (post) {
    return (
      <Container>
        <br />
        <Row className="justify-content-center">
          <Col md={8}>
            <h3>{post.title}</h3>
            <div>{post.content}</div>
            <hr />
            <div>
              {post.tags &&
                post.tags.map(tag => {
                  return (
                    <span post-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </div>
            <div>{post.date}</div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading post...</p>
          </Col>
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const posts = state.firestore.data.notebook;
  const post = posts ? posts[path] : null;
  return {
    post: post,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notebook" }])
)(PostDetails);
