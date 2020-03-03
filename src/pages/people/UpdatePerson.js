import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { updatePerson } from "../../store/actions/personActions";

class UpdatePerson extends Component {
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
    this.props.updatePerson(this.state);
    this.props.history.push("/people");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.person.path,
        title: props.person.title,
        content: props.person.content,
        tags: props.person.tags
      }));
    }
  }

  render() {
    const { auth, person } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (person) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Person</h5>
            <div className="entity-path-input input-field">
              <input disabled type="text" id="path" value={person.path} />
            </div>
            <div className="input-field">
              <input disabled type="text" id="title" value={person.title} />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Content
              </label>
              <textarea
                id="content"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={person.content}
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
                defaultValue={person.tags}
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
          <p>Loading person...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const people = state.firestore.data.people;
  const person = people ? people[path] : null;

  return {
    person: person,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePerson: person => dispatch(updatePerson(person))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "people" }])
)(UpdatePerson);
