export const addService = (service) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log("SERV", service);

    let servicePath = service.title.replace(/\s+/g, "-").toLowerCase();
    servicePath = servicePath.replace("/", "_");
    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();
    const snippet =
      service.content
        .split(" ")
        .slice(0, 10)
        .join(" ") + "...";

    if (service.tags) {
      let tagSet = new Set();
      service.tags = service.tags.split(/s*[,]s*/);

      service.tags.forEach((tag) => {
        if (!tagSet.has(tag)) {
          tagSet.add(tag);
        }
      });

      service.tags = Array.from(tagSet);
    }

    const serviceObj = {
      ...service,
      path: servicePath,
      snippet: snippet,
      created_at: createdAt,
      date: date,
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

export const updateService = (service) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const serviceRef = await firestore.collection("services").doc(service.path);
    let updatedServiceObj = service;

    service.snippet =
      service.content
        .split(" ")
        .slice(0, 10)
        .join(" ") + "...";

    if (typeof updatedServiceObj.tags == "string") {
      updatedServiceObj.tags = updatedServiceObj.tags
        .replace(/\s/g, "")
        .split(",");
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

export const destroyService = (service) => {
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
