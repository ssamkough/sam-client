const initState = {};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("Created post!", action.post);
      return state;
    case "CREATE_POST_ERROR":
      console.log("Failed to create post! Error:\n", action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;
