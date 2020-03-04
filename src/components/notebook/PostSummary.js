import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { destroyPost } from "./../../store/actions/postActions";

const PostSummary = props => {
  const { post } = props;
  return (
    <Card className="entity-card text-center">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.snippet}</Card.Text>
        <Button as={Link} to={"/notebook/" + post.path} variant="primary">
          View Details
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container fluid>
          <Row>
            <Col>
              {post.tags &&
                post.tags.map(tag => {
                  return (
                    <span post-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Button
                as={Link}
                to={{ pathname: "/updatepost/" + post.path, state: post }}
                variant="outline-dark"
              >
                Update
              </Button>
            </Col>
            <Col md={6}>{post.date}</Col>
            <Col md={3}>
              <Button
                onClick={() => props.destroyPost(post)}
                variant="outline-dark"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    destroyPost: post => dispatch(destroyPost(post))
  };
};

export default connect(null, mapDispatchToProps)(PostSummary);
