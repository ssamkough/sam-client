const initState = {
  posts: [
    { id: "1", title: "Test 1", content: "Blah 1", tags: "Tag 1" },
    { id: "2", title: "Test 2", content: "Blah 2", tags: "Tag 2" },
    { id: "3", title: "Test 3", content: "Blah 3", tags: "Tag 3" }
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("Created post!", action.post);
      return state;
    case "CREATE_POST_ERR":
      console.log("Failed to create post! Error:\n", action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;
