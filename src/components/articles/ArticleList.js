import React from "react";
import ArticleSummary from "./ArticleSummary";

const ArticleList = ({ articles }) => {
  return (
    <div className="entity-list container">
      {articles &&
        articles.map(article => {
          return <ArticleSummary article={article} key={article.id} />;
        })}
    </div>
  );
};

export default ArticleList;
