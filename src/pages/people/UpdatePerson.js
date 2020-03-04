import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { updatePerson } from "../../store/actions/personActions";

class UpdatePerson extends Component {
  state = {
    id: "",
    first_name: "",
    last_name: "",
    link: "",
    description: ""
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
        id: props.match.params.id,
        first_name: props.person.first_name,
        last_name: props.person.last_name,
        description: props.person.description,
        link: props.person.tags
      }));
    }
  }

  render() {
    const { auth, person, match } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (person) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Person</h5>
            <div className="entity-path-input input-field">
              <input disabled type="text" id="id" value={match.params.id} />
            </div>
            <div className="input-field">
              <label htmlFor="first_name" className="active">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                onChange={this.handleChange}
                defaultValue={person.first_name}
              />
            </div>
            <div className="input-field">
              <label htmlFor="last_name" className="active">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                onChange={this.handleChange}
                defaultValue={person.last_name}
              />
            </div>
            <div className="input-field">
              <label htmlFor="link" className="active">
                Link
              </label>
              <input
                type="text"
                id="link"
                onChange={this.handleChange}
                defaultValue={person.link}
              />
            </div>
            <div className="input-field">
              <label htmlFor="description" className="active">
                Description
              </label>
              <textarea
                id="description"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={person.description}
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
  const id = ownProps.match.params.id;
  const people = state.firestore.data.people;
  const person = people ? people[id] : null;

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
