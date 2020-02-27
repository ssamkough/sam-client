export const addPost = post => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const postPath = post.title.replace(/\s+/g, "-").toLowerCase();
    const timestamp = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = timestamp.toDateString();
    const postObj = {
      ...post,
      path: postPath,
      timestamp: timestamp,
      date: date
    };

    try {
      await firestore
        .collection("notebook")
        .doc(postPath)
        .set(postObj);
      dispatch({ type: "CREATE_POST", post });
    } catch (err) {
      dispatch({ type: "CREATE_POST_ERR", err });
    }
  };
};
