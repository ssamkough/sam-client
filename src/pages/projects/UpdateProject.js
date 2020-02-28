import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { updateProject } from "../../store/actions/projectActions";

class UpdateProject extends Component {
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
    this.props.updateProject(this.state);
    this.props.history.push("/projects");
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState((state, props) => ({
        path: props.project.path,
        title: props.project.title,
        content: props.project.content,
        tags: props.project.tags
      }));
    }
  }

  render() {
    const { auth, project } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    if (project) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Project</h5>
            <div className="entity-path-input input-field">
              <input disabled type="text" id="path" value={project.path} />
            </div>
            <div className="input-field">
              <input disabled type="text" id="title" value={project.title} />
            </div>
            <div className="input-field">
              <label htmlFor="content" className="active">
                Content
              </label>
              <textarea
                id="content"
                onChange={this.handleChange}
                className="materialize-textarea"
                defaultValue={project.content}
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
                defaultValue={project.tags}
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
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[path] : null;

  return {
    project: project,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: project => dispatch(updateProject(project))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(UpdateProject);
