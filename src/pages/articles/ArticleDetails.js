import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const ArticleDetails = props => {
  const { article, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (article) {
    return (
      <div className="container section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{article.title}</span>
            <p>{article.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>{article.tags}</div>
            <div>{article.date}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading article...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const articles = state.firestore.data.articles;
  const article = articles ? articles[path] : null;
  return {
    article: article,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "articles" }])
)(ArticleDetails);
