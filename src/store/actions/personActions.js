export const addPerson = person => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    const personObj = {
      ...person,
      created_at: createdAt,
      date: date
    };

    try {
      await firestore.collection("people").add(personObj);
      dispatch({ type: "CREATE_PERSON", person });
    } catch (err) {
      dispatch({ type: "CREATE_PERSON_ERROR", err });
    }
  };
};

export const updatePerson = person => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const personRef = await firestore.collection("people").doc(person.id);
    let updatedPersonObj = person;

    updatedPersonObj.edited_at = firestore.Timestamp.fromDate(
      new Date()
    ).toDate();

    try {
      await personRef.update(updatedPersonObj);
      dispatch({ type: "UPDATE_PERSON", person });
    } catch (err) {
      dispatch({ type: "UPDATE_PERSON_ERROR", err });
    }
  };
};

export const destroyPerson = person => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore
        .collection("people")
        .doc(person.id)
        .delete();
      dispatch({ type: "DESTROY_PERSON", person });
    } catch (err) {
      dispatch({ type: "DESTROY_PERSON_ERROR", err });
    }
  };
};
