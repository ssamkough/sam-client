import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ArticleSummary from "./ArticleSummary";

const ArticleList = ({ articles }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Articles</h3>
        </Col>
      </Row>
      {articles &&
        articles.map(article => {
          return (
            <Row key={article.id}>
              <Col key={article.id}>
                <ArticleSummary key={article.id} article={article} /> <br />{" "}
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default ArticleList;
