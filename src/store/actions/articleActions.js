export const addArticle = article => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const createdAt = firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    let tagSet = new Set();
    article.tags = article.tags.split(/s*[s,]s*/);

    article.tags.forEach(tag => {
      if (!tagSet.has(tag)) {
        tagSet.add(tag);
      }
    });

    article.tags = Array.from(tagSet);

    const articleObj = {
      ...article,
      created_at: createdAt,
      date: date
    };

    try {
      await firestore.collection("articles").add(articleObj);
      dispatch({ type: "CREATE_ARTICLE", article });
    } catch (err) {
      dispatch({ type: "CREATE_ARTICLE_ERROR", err });
    }
  };
};

export const updateArticle = article => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const articleRef = await firestore.collection("articles").doc(article.id);
    let updatedArticleObj = article;

    if (updatedArticleObj.tags) {
      try {
        let currTags = await articleRef.get();
        let arr = [...updatedArticleObj.tags, ...currTags.data().tags];
        let tagSet = new Set();

        arr.forEach(tag => {
          if (!tagSet.has(tag)) {
            tagSet.add(tag);
          }
        });

        updatedArticleObj.tags = Array.from(tagSet);
      } catch (error) {
        console.error("Error updating document:\n", error);
      }
    }

    updatedArticleObj.edited_at = firestore.Timestamp.fromDate(
      new Date()
    ).toDate();

    try {
      await articleRef.update(updatedArticleObj);
      dispatch({ type: "UPDATE_ARTICLE", article });
    } catch (err) {
      dispatch({ type: "UPDATE_ARTICLE_ERROR", err });
    }
  };
};

export const destroyArticle = article => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore
        .collection("articles")
        .doc(article.id)
        .delete();
      dispatch({ type: "DESTROY_ARTICLE", article });
    } catch (err) {
      dispatch({ type: "DESTROY_ARTICLE_ERROR", err });
    }
  };
};
