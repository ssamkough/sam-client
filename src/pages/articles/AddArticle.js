import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { addArticle } from "../../store/actions/articleActions";

class AddArticle extends Component {
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
    this.props.addArticle(this.state);
    this.props.history.push("/articles");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Add Article</h5>
          <div className="input-field">
            <label htmlFor="link">Link</label>
            <input type="text" id="link" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="authorFirstName">Author's First Name</label>
            <input
              type="text"
              id="authorFirstName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="authorLastName">Author's Last Name</label>
            <input
              type="text"
              id="authorLastName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="publisher">Publisher</label>
            <input type="text" id="publisher" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="publicationDate">Publication Date</label>
            <input
              type="text"
              id="publicationDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              onChange={this.handleChange}
              maxLength="400"
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
    addArticle: article => dispatch(addArticle(article))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
