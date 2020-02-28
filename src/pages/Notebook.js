import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import PostList from "./../components/posts/PostList";

class Notebook extends Component {
  render() {
    const { posts, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12 l12">
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.notebook,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notebook", orderBy: ["timestamp", "desc"] }])
)(Notebook);
