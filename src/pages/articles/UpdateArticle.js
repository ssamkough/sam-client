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

import { updateArticle } from "../../store/actions/articleActions";

class UpdateArticle extends Component {
  state = {
    id: "",
    link: "",
    title: "",
    author_first_name: "",
    author_last_name: "",
    website: "",
    publisher: "",
    publication_date: "",
    description: "",
    tags: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateArticle(this.state);
    this.props.history.push("/articles");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        id: props.match.params.id,
        link: props.article.link,
        title: props.article.title,
        author_first_name: props.article.author_first_name,
        author_last_name: props.article.author_last_name,
        website: props.article.website,
        publisher: props.article.publisher,
        publication_date: props.article.publication_date,
        description: props.article.description,
        tags: props.article.tags
      }));
    }
  }

  render() {
    const { auth, article } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (article) {
      return (
        <Container>
          <br></br>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <h4>Update Article</h4>
                <Form.Group controlId="link">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.link}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.title}
                  />
                </Form.Group>
                <Form.Group controlId="author_first_name">
                  <Form.Label>Author's First Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.author_first_name}
                  />
                </Form.Group>
                <Form.Group controlId="author_last_name">
                  <Form.Label>Author's Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.author_last_name}
                  />
                </Form.Group>
                <Form.Group controlId="website">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.website}
                  />
                </Form.Group>
                <Form.Group controlId="publisher">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.publisher}
                  />
                </Form.Group>
                <Form.Group controlId="publication_date">
                  <Form.Label>Publication Date</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.publication_date}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.description}
                  />
                </Form.Group>
                <Form.Group controlId="tags">
                  <Form.Label>Tags (separate w/ commas)</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={article.tags}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Update Article
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
            <Col>Loading article...</Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const articles = state.firestore.data.articles;
  const article = articles ? articles[id] : null;

  return {
    article: article,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateArticle: article => dispatch(updateArticle(article))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "articles" }])
)(UpdateArticle);
