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
          <b>
            {person.first_name} {person.last_name}
          </b>
        </span>
        <p className="white-text">{person.description}</p>
        <p className="white-text">{person.link}</p>
      </div>
      <div className="card-action container">
        <div className="row">
          <div className="col s3 m3 l3">
            <Link
              to={{ pathname: "/updateperson/" + person.id, state: person }}
            >
              <div className="waves-effect white black-text btn">Update</div>
            </Link>
          </div>
          <div className="col s6 m6 l6">
            <p className="white-text">{person.date}</p>
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
