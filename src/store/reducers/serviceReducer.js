const initState = {};

const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      console.log("Created service!", action.service);
      return state;
    case "CREATE_SERVICE_ERROR":
      console.log("Failed to create service! Error:\n", action.err);
      return state;
    default:
      return state;
  }
};

export default serviceReducer;
