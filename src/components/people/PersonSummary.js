import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { destroyPerson } from "../../store/actions/personActions";

const PersonSummary = props => {
  const { person } = props;
  return (
    <div className="card black">
      <div className="card-content">
        <span className="card-title white-text">
          <b>{person.title}</b>
        </span>
        <p className="white-text">{person.content}</p>
        <br></br>
        <div>
          <Link to={"/person/" + person.path}>
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
              to={{ pathname: "/updateperson/" + person.path, state: person }}
            >
              <div className="waves-effect white black-text btn">Update</div>
            </Link>
          </div>
          <div className="col s6 m6 l6">
            <p className="white-text">{person.date}</p>
            <ul className="tag-list white-text">
              {person.tags &&
                person.tags.map(tag => {
                  return (
                    <li person-tag={tag} key={tag.toString()}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col s3 m3 l3">
            <button
              onClick={() => props.destroyPerson(props.person)}
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
    destroyPerson: person => dispatch(destroyPerson(person))
  };
};

export default connect(null, mapDispatchToProps)(PersonSummary);
