import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { updateService } from "../../store/actions/serviceActions";

class UpdateService extends Component {
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
    this.props.updateService(this.state);
    this.props.history.push("/services");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.service.path,
        title: props.service.title,
        content: props.service.content,
        tags: props.service.tags
      }));
    }
  }

  render() {
    const { auth, service } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (service) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Service</h5>
            <div className="entity-path-input input-field">
              <input disabled type="text" id="path" value={service.path} />
            </div>
            <div className="input-field">
              <input disabled type="text" id="title" value={service.title} />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Content
              </label>
              <textarea
                id="content"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={service.content}
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
                defaultValue={service.tags}
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
          <p>Loading service...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const services = state.firestore.data.services;
  const service = services ? services[path] : null;

  return {
    service: service,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateService: service => dispatch(updateService(service))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "services" }])
)(UpdateService);
