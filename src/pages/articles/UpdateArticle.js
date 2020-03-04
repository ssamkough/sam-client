import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

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
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Article</h5>
            <div className="entity-path-input input-field">
              <input disabled type="text" id="id" value={article.id} />
            </div>
            <div className="input-field">
              <label htmlFor="link" className="active">
                Link
              </label>
              <input
                type="text"
                id="link"
                onChange={this.handleChange}
                defaultValue={article.link}
              />
            </div>
            <div className="input-field">
              <label htmlFor="title" className="active">
                Title
              </label>
              <input
                type="text"
                id="title"
                onChange={this.handleChange}
                defaultValue={article.title}
              />
            </div>
            <div className="input-field">
              <label htmlFor="author_first_name" className="active">
                Author's First Name
              </label>
              <input
                type="text"
                id="author_first_name"
                onChange={this.handleChange}
                defaultValue={article.author_first_name}
              />
            </div>
            <div className="input-field">
              <label htmlFor="author_last_name" className="active">
                Author's Last Name
              </label>
              <input
                type="text"
                id="author_last_name"
                onChange={this.handleChange}
                defaultValue={article.author_last_name}
              />
            </div>
            <div className="input-field">
              <label htmlFor="website" className="active">
                Website
              </label>
              <input
                type="text"
                id="website"
                onChange={this.handleChange}
                defaultValue={article.website}
              />
            </div>
            <div className="input-field">
              <label htmlFor="publisher" className="active">
                Publisher
              </label>
              <input
                type="text"
                id="publisher"
                onChange={this.handleChange}
                defaultValue={article.publisher}
              />
            </div>
            <div className="input-field">
              <label htmlFor="publication_date" className="active">
                Publication Date
              </label>
              <input
                type="text"
                id="publication_date"
                onChange={this.handleChange}
                defaultValue={article.publication_date}
              />
            </div>
            <div className="input-field">
              <label htmlFor="description" className="active">
                Description
              </label>
              <textarea
                id="description"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={article.description}
              />
            </div>
            <div className="input-field">
              <label htmlFor="tags" className="active">
                Tags (separate w/ commas)
              </label>
              <input
                type="text"
                id="tags"
                onChange={this.handleChange}
                defaultValue={article.tags}
              />
            </div>
            <div className="input-field">
              <button className="btn black lighten-1 z-depth-0 ">
                Update<i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading article...</p>
        </div>
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
