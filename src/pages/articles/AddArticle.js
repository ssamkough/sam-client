import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { addArticle } from "../../store/actions/articleActions";

class AddArticle extends Component {
  state = {
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
    this.props.addArticle(this.state);
    this.props.history.push("/articles");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        <br></br>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <h4>Add Article</h4>
              <Form.Group controlId="link">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="author_first_name">
                <Form.Label>Author's First Name</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="author_last_name">
                <Form.Label>Author's Last Name</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="publisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="publication_date">
                <Form.Label>Publication Date</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="tags">
                <Form.Label>Tags (separate w/ commas)</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Add Article
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
