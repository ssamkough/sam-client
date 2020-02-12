import React from "react";

const PostDetails = props => {
  const id = props.match.params.id;
  <div className="container section">
    <div className="card z-depth-0">
      <div className="card-content">
        <span className="card-title">Title - {id}</span>
        <p>Posted by blah</p>
      </div>
      <div className="card-action grey lighten-4 grey-text">
        <div>posted by blah</div>
        <div>date</div>
      </div>
    </div>
  </div>;
};

export default PostDetails;
