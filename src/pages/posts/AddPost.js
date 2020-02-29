import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { addPost } from "./../../store/actions/postActions";

class AddPost extends Component {
  state = {
    title: "",
    content: "",
    tags: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state);
    this.props.history.push("/notebook");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Add Post</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              onChange={this.handleChange}
              className="materialize-textarea"
            />
          </div>
          <div className="input-field">
            <label htmlFor="tags">Tags (separate w/ commas)</label>
            <input type="text" id="tags" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn black lighten-1 z-depth-0 ">
              Add<i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
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
    addPost: post => dispatch(addPost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
