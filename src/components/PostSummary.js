import React from "react";

const PostSummary = ({ post }) => {
  return (
    <div className="card black">
      <p className="white-text">{post.date}</p>
      <span className="card-title white-text">{post.title}</span>
      <p className="white-text">{post.content}</p>
      <p className="white-text">{post.tags}</p>
    </div>
  );
};

export default PostSummary;
