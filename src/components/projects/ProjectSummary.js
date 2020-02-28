import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { destroyProject } from "./../../store/actions/projectActions";

const ProjectSummary = props => {
  const { project } = props;

  return (
    <div className="card black">
      <div className="card-content">
        <span className="card-title white-text">
          <b>{project.title}</b>
        </span>
        <p className="white-text">{project.content}</p>
        <br></br>
        <div>
          <Link to={"/project/" + project.path}>
            <div className="waves-effect white black-text btn">
              View Details
            </div>
          </Link>
        </div>
      </div>
      <div className="card-action container">
        <div className="row">
          <div className="col s3 m3 l3">
            <Link
              to={{
                pathname: "/updateproject/" + project.path,
                state: project
              }}
            >
              <div className="waves-effect white black-text btn">Update</div>
            </Link>
          </div>
          <div className="col s6 m6 l6">
            <p className="white-text">{project.date}</p>
            <ul className="tag-list white-text">
              {project.tags &&
                project.tags.map(tag => {
                  return (
                    <li project-tag={tag} key={tag.toString()}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col s3 m3 l3">
            <button
              onClick={() => props.destroyProject(props.project)}
              className="waves-effect white black-text btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    destroyProject: project => dispatch(destroyProject(project))
  };
};

export default connect(null, mapDispatchToProps)(ProjectSummary);
