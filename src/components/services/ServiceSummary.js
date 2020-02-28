import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { destroyService } from "./../../store/actions/serviceActions";

const ServiceSummary = props => {
  const { service } = props;

  return (
    <div className="card black">
      <div className="card-content">
        <span className="card-title white-text">
          <b>{service.title}</b>
        </span>
        <p className="white-text">{service.content}</p>
        <br></br>
        <div>
          <Link to={"/service/" + service.path}>
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
                pathname: "/updateservice/" + service.path,
                state: service
              }}
            >
              <div className="waves-effect white black-text btn">Update</div>
            </Link>
          </div>
          <div className="col s6 m6 l6">
            <p className="white-text">{service.date}</p>
            <ul className="tag-list white-text">
              {service.tags &&
                service.tags.map(tag => {
                  return (
                    <li service-tag={tag} key={tag.toString()}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col s3 m3 l3">
            <button
              onClick={() => props.destroyService(props.service)}
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
    destroyService: service => dispatch(destroyService(service))
  };
};

export default connect(null, mapDispatchToProps)(ServiceSummary);
