import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { destroyArticle } from "../../store/actions/articleActions";

const ArticleSummary = props => {
  const { article } = props;
  return (
    <Card className="entity-card text-center">
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container fluid>
          <Row>
            <Col>
              {article.tags &&
                article.tags.map(tag => {
                  return (
                    <span article-tag={tag} key={tag.toString()}>
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
                to={{
                  pathname: "/updatearticle/" + article.id,
                  state: article
                }}
                variant="outline-dark"
              >
                Update
              </Button>
            </Col>
            <Col md={6}>{article.date}</Col>
            <Col md={3}>
              <Button
                onClick={() => props.destroyArticle(article)}
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
    destroyArticle: article => dispatch(destroyArticle(article))
  };
};

export default connect(null, mapDispatchToProps)(ArticleSummary);
