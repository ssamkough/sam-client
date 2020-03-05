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

import ArticleList from "./../../components/articles/ArticleList";

class Articles extends Component {
  render() {
    const { articles, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col md={10}>
            <ArticleList articles={articles} />
          </Col>
          <Col md={2}>
            <Button
              as={NavLink}
              to="/addarticle"
              variant="outline-dark"
              size="md"
              className="add-entity"
            >
              Add Article
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.firestore.ordered.articles,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "articles", orderBy: ["created_at", "desc"] }
  ])
)(Articles);
