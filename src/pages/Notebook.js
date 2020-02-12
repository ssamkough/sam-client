import React, { Component } from "react";
import Notifications from "./../components/Notifications";
import PostList from "./../components/PostList";
import { connect } from "react-redux";

class Notebook extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <PostList posts={posts} />
            <div className="col s12 m5 offset-m1">
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  };
};

export default connect(mapStateToProps)(Notebook);
