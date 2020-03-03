import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { updateArticle } from "../../store/actions/articleActions";

class UpdateArticle extends Component {
  state = {
    path: "",
    title: "",
    content: "",
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
        path: props.article.path,
        title: props.article.title,
        content: props.article.content,
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
              <input disabled type="text" id="path" value={article.path} />
            </div>
            <div className="input-field">
              <input disabled type="text" id="title" value={article.title} />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Content
              </label>
              <textarea
                id="content"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={article.content}
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
  const path = ownProps.match.params.path;
  const articles = state.firestore.data.articles;
  const article = articles ? articles[path] : null;

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
