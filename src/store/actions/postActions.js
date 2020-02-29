export const addPost = post => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const postPath = post.title.replace(/\s+/g, "-").toLowerCase();
    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    let tagSet = new Set();
    post.tags = post.tags.split(/s*[s,]s*/);

    post.tags.forEach(tag => {
      if (!tagSet.has(tag)) {
        tagSet.add(tag);
      }
    });

    post.tags = Array.from(tagSet);

    const postObj = {
      ...post,
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
    console.log(post);

    const postRef = await firestore.collection("notebook").doc(post.path);
    let updatedPostObj = post;

    if (updatedPostObj.tags) {
      try {
        let currTags = await postRef.get();
        let arr = [...updatedPostObj.tags, ...currTags.data().tags];
        let tagSet = new Set();

        arr.forEach(tag => {
          if (!tagSet.has(tag)) {
            tagSet.add(tag);
          }
        });

        updatedPostObj.tags = Array.from(tagSet);
      } catch (error) {
        console.error("Error updating document:\n", error);
      }
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
