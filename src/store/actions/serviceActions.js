export const addService = service => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const servicePath = service.title.replace(/\s+/g, "-").toLowerCase();
    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    let tagSet = new Set();
    service.tags = service.tags.split(/s*[s,]s*/);

    service.tags.forEach(tag => {
      if (!tagSet.has(tag)) {
        tagSet.add(tag);
      }
    });

    service.tags = Array.from(tagSet);

    const serviceObj = {
      ...service,
      path: servicePath,
      created_at: createdAt,
      date: date
    };

    try {
      await firestore
        .collection("services")
        .doc(servicePath)
        .set(serviceObj);
      dispatch({ type: "CREATE_SERVICE", service });
    } catch (err) {
      dispatch({ type: "CREATE_SERVICE_ERROR", err });
    }
  };
};

export const updateService = service => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(service);

    const serviceRef = await firestore.collection("services").doc(service.path);
    let updatedServiceObj = service;

    if (updatedServiceObj.tags) {
      try {
        let currTags = await serviceRef.get();
        let arr = [...updatedServiceObj.tags, ...currTags.data().tags];
        let tagSet = new Set();

        arr.forEach(tag => {
          if (!tagSet.has(tag)) {
            tagSet.add(tag);
          }
        });

        updatedServiceObj.tags = Array.from(tagSet);
      } catch (error) {
        console.error("Error updating document:\n", error);
      }
    }

    updatedServiceObj.edited_at = firestore.Timestamp.fromDate(
      new Date()
    ).toDate();

    try {
      await serviceRef.update(updatedServiceObj);
      dispatch({ type: "UPDATE_POST", service });
    } catch (err) {
      dispatch({ type: "UPDATE_POST_ERROR", err });
    }
  };
};

export const destroyService = service => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore
        .collection("services")
        .doc(service.path)
        .delete();
      dispatch({ type: "DESTROY_POST", service });
    } catch (err) {
      dispatch({ type: "DESTROY_POST_ERROR", err });
    }
  };
};
