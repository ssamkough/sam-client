import React from "react";
import { Link } from "react-router-dom";

const PostSummary = ({ post }) => {
  return (
    <div className="card black">
      <div className="card-content">
        <span className="card-title white-text">
          <b>{post.title}</b>
        </span>
        <p className="white-text">{post.content}</p>
        <br></br>
        <div>
          <Link to={"/post/" + post.path}>
            <div className="waves-effect white black-text btn">
              View Details
            </div>
          </Link>
        </div>
      </div>
      <div className="card-action">
        <p className="white-text">{post.date}</p>
        <p className="white-text">{post.tags}</p>
      </div>
    </div>
  );
};

export default PostSummary;
