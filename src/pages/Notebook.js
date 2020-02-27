import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import PostList from "./../components/PostList";

class Notebook extends Component {
  render() {
    const { posts } = this.props;
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
    posts: state.firestore.ordered.notebook
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notebook" }])
)(Notebook);
