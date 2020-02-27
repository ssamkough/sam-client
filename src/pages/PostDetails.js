import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const PostDetails = props => {
  const { post } = props;
  if (post) {
    return (
      <div className="container section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{post.title}</span>
            <p>{post.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>{post.tags}</div>
            <div>{post.date}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container section">
        <p>Loading post...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const posts = state.firestore.data.notebook;
  const post = posts ? posts[path] : null;
  return {
    post: post
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notebook" }])
)(PostDetails);
