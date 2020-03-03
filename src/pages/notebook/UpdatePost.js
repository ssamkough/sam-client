import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { updatePost } from "./../../store/actions/postActions";

class UpdatePost extends Component {
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
    this.props.updatePost(this.state);
    this.props.history.push("/notebook");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.post.path,
        title: props.post.title,
        content: props.post.content,
        tags: props.post.tags
      }));
    }
  }

  render() {
    const { auth, post } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (post) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Post</h5>
            <div className="entity-path-input input-field">
              <input disabled type="text" id="path" value={post.path} />
            </div>
            <div className="input-field">
              <input disabled type="text" id="title" value={post.title} />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Content
              </label>
              <textarea
                id="content"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={post.content}
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
                defaultValue={post.tags}
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
          <p>Loading post...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const posts = state.firestore.data.notebook;
  const post = posts ? posts[path] : null;

  return {
    post: post,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePost: post => dispatch(updatePost(post))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "notebook" }])
)(UpdatePost);
