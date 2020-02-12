import React from "react";

const PostSummary = ({ post }) => {
  return (
    <div className="card z-depth-0 post-summary">
      <span className="card-title">{post.title}</span>
      <p>{post.content}</p>
      <p className="grey-text">{post.tags}</p>
    </div>
  );
};

export default PostSummary;
