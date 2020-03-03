import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { addPerson } from "../../store/actions/personActions";

class AddPerson extends Component {
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
    this.props.addPerson(this.state);
    this.props.history.push("/people");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Add Person</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
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
            <label htmlFor="link">Link</label>
            <input type="text" id="link" onChange={this.handleChange} />
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
    addPerson: person => dispatch(addPerson(person))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson);
