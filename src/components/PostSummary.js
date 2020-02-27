import React from "react";
import { Link } from "react-router-dom";

const PostSummary = ({ post }) => {
  return (
    <div className="card black">
      <p className="white-text">{post.date}</p>
      <span className="card-title white-text">{post.title}</span>
      <p className="white-text">{post.content}</p>
      <Link to={"/post/" + post.path}>
        <div className="waves-effect white black-text btn">View Details</div>
      </Link>
      <p className="white-text">{post.tags}</p>
    </div>
  );
};

export default PostSummary;
