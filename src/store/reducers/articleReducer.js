const initState = {};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_ARTICLE":
      console.log("Created article!", action.article);
      return state;
    case "CREATE_ARTICLE_ERROR":
      console.log("Failed to create article! Error:\n", action.err);
      return state;
    case "UPDATE_ARTICLE":
      console.log("Updated article!", action.article);
      return state;
    case "UPDATE_ARTICLE_ERROR":
      console.log("Failed to update article! Error:\n", action.err);
      return state;
    case "DESTROY_ARTICLE":
      console.log("Destroyed article!", action.article);
      return state;
    case "DESTROY_ARTICLE_ERROR":
      console.log("Failed to destroy article! Error:\n", action.err);
      return state;
    default:
      return state;
  }
};

export default articleReducer;
