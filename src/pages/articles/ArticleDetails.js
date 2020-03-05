import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ArticleDetails = props => {
  const { article, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (article) {
    return (
      <Container>
        <br />
        <Row className="justify-content-center">
          <Col md={8}>
            <h3>{article.title}</h3>
            <div>{article.content}</div>
            <hr />
            <div>
              {article.tags &&
                article.tags.map(tag => {
                  return (
                    <span article-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </div>
            <div>{article.date}</div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading article...</p>
          </Col>
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const articles = state.firestore.data.articles;
  const article = articles ? articles[path] : null;
  return {
    article: article,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "articles" }])
)(ArticleDetails);
