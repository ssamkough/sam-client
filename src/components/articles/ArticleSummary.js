import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { destroyArticle } from "../../store/actions/articleActions";

const ArticleSummary = props => {
  const { article } = props;
  return (
    <div className="card black">
      <div className="card-content">
        <span className="card-title white-text">
          <b>{article.title}</b>
        </span>
        <p className="white-text">{article.description}</p>
        <br></br>
      </div>
      <div className="card-action container">
        <div className="row">
          <div className="col s3 m3 l3">
            <Link
              to={{
                pathname: "/updatearticle/" + article.id,
                state: article
              }}
            >
              <div className="waves-effect white black-text btn">Update</div>
            </Link>
          </div>
          <div className="col s6 m6 l6">
            <p className="white-text">{article.date}</p>
            <ul className="tag-list white-text">
              {article.tags &&
                article.tags.map(tag => {
                  return (
                    <li article-tag={tag} key={tag.toString()}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col s3 m3 l3">
            <button
              onClick={() => props.destroyArticle(props.article)}
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
    destroyArticle: article => dispatch(destroyArticle(article))
  };
};

export default connect(null, mapDispatchToProps)(ArticleSummary);
