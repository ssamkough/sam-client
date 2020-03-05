import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PostSummary from "./PostSummary";

const PostList = ({ posts }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Posts</h3>
        </Col>
      </Row>
      {posts &&
        posts.map(post => {
          return (
            <Row key={post.path}>
              <Col key={post.path}>
                <PostSummary key={post.path} post={post} /> <br />{" "}
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default PostList;
