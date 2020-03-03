const initState = {};

const personReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PERSON":
      console.log("Added a person!", action.person);
      return state;
    case "CREATE_PERSON_ERROR":
      console.log("Failed to add a person! Error:\n", action.err);
      return state;
    case "UPDATE_PERSON":
      console.log("Updated a person!", action.person);
      return state;
    case "UPDATE_PERSON_ERROR":
      console.log("Failed to update a person! Error:\n", action.err);
      return state;
    case "DESTROY_PERSON":
      console.log("Destroyed a person!", action.person);
      return state;
    case "DESTROY_PERSON_ERROR":
      console.log("Failed to destroy a person! Error:\n", action.err);
      return state;
    default:
      return state;
  }
};

export default personReducer;
