import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { destroyPost } from "./../../store/actions/postActions";

const PostSummary = props => {
  const { post } = props;
  return (
    <div className="card black">
      <div className="card-content">
        <span className="card-title white-text">
          <b>{post.title}</b>
        </span>
        <p className="white-text">{post.snippet}</p>
        <br></br>
        <div>
          <Link to={"/post/" + post.path}>
            <div className="waves-effect white black-text btn">
              View Details
            </div>
          </Link>
        </div>
      </div>
      <div className="card-action container">
        <div className="row">
          <div className="col s3 m3 l3">
            <Link to={{ pathname: "/updatepost/" + post.path, state: post }}>
              <div className="waves-effect white black-text btn">Update</div>
            </Link>
          </div>
          <div className="col s6 m6 l6">
            <p className="white-text">{post.date}</p>
            <ul className="tag-list white-text">
              {post.tags &&
                post.tags.map(tag => {
                  return (
                    <li post-tag={tag} key={tag.toString()}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col s3 m3 l3">
            <button
              onClick={() => props.destroyPost(props.post)}
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
    destroyPost: post => dispatch(destroyPost(post))
  };
};

export default connect(null, mapDispatchToProps)(PostSummary);
