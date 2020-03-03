export const addProject = project => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const projectPath = project.title.replace(/\s+/g, "-").toLowerCase();
    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    let tagSet = new Set();
    project.tags = project.tags.split(/s*[,]s*/);

    project.tags.forEach(tag => {
      if (!tagSet.has(tag)) {
        tagSet.add(tag);
      }
    });

    project.tags = Array.from(tagSet);

    const projectObj = {
      ...project,
      path: projectPath,
      created_at: createdAt,
      date: date
    };

    try {
      await firestore
        .collection("projects")
        .doc(projectPath)
        .set(projectObj);
      dispatch({ type: "CREATE_PROJECT", project });
    } catch (err) {
      dispatch({ type: "CREATE_PROJECT_ERROR", err });
    }
  };
};

export const updateProject = project => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const projectRef = await firestore.collection("projects").doc(project.path);
    let updatedProjectObj = project;

    if (updatedProjectObj.tags) {
      try {
        let currTags = await projectRef.get();
        let arr = [...updatedProjectObj.tags, ...currTags.data().tags];
        let tagSet = new Set();

        arr.forEach(tag => {
          if (!tagSet.has(tag)) {
            tagSet.add(tag);
          }
        });

        updatedProjectObj.tags = Array.from(tagSet);
      } catch (error) {
        console.error("Error updating document:\n", error);
      }
    }

    updatedProjectObj.edited_at = firestore.Timestamp.fromDate(
      new Date()
    ).toDate();

    try {
      await projectRef.update(updatedProjectObj);
      dispatch({ type: "UPDATE_POST", project });
    } catch (err) {
      dispatch({ type: "UPDATE_POST_ERROR", err });
    }
  };
};

export const destroyProject = project => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore
        .collection("projects")
        .doc(project.path)
        .delete();
      dispatch({ type: "DESTROY_POST", project });
    } catch (err) {
      dispatch({ type: "DESTROY_POST_ERROR", err });
    }
  };
};
