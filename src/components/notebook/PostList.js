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
            <Row>
              <Col>
                <PostSummary post={post} key={post.id} /> <br />{" "}
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default PostList;
