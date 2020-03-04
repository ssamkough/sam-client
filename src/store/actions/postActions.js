export const addPost = post => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const postPath = post.title.replace(/\s+/g, "-").toLowerCase();
    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();
    const snippet =
      post.content
        .split(" ")
        .slice(0, 10)
        .join(" ") + "...";

    if (post.tags) {
      let tagSet = new Set();
      post.tags = post.tags.replace(/\s/g, "").split(",");

      post.tags.forEach(tag => {
        if (!tagSet.has(tag)) {
          tagSet.add(tag);
        }
      });

      post.tags = Array.from(tagSet);
    }

    if (post.helpers) {
      post.helpers = post.helpers.replace(/\s/g, "").split(",");
    }

    const postObj = {
      ...post,
      snippet: snippet,
      path: postPath,
      created_at: createdAt,
      date: date
    };

    try {
      await firestore
        .collection("notebook")
        .doc(postPath)
        .set(postObj);
      dispatch({ type: "CREATE_POST", post });
    } catch (err) {
      dispatch({ type: "CREATE_POST_ERROR", err });
    }
  };
};

export const updatePost = post => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const postRef = await firestore.collection("notebook").doc(post.path);
    let updatedPostObj = post;

    post.snippet =
      post.content
        .split(" ")
        .slice(0, 10)
        .join(" ") + "...";

    if (typeof updatedPostObj.tags == "string") {
      updatedPostObj.tags = updatedPostObj.tags.replace(/\s/g, "").split(",");
    }

    if (typeof updatedPostObj.helpers == "string") {
      updatedPostObj.helpers = updatedPostObj.helpers
        .replace(/\s/g, "")
        .split(",");
    }

    updatedPostObj.edited_at = firestore.Timestamp.fromDate(
      new Date()
    ).toDate();

    try {
      await postRef.update(updatedPostObj);
      dispatch({ type: "UPDATE_POST", post });
    } catch (err) {
      dispatch({ type: "UPDATE_POST_ERROR", err });
    }
  };
};

export const destroyPost = post => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore
        .collection("notebook")
        .doc(post.path)
        .delete();
      dispatch({ type: "DESTROY_POST", post });
    } catch (err) {
      dispatch({ type: "DESTROY_POST_ERROR", err });
    }
  };
};
