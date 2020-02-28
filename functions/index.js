const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const createNotification = async notification => {
  const doc = await admin
    .firestore()
    .collection("notifications")
    .add(notification);

  return console.log("Notification added!", doc);
};

exports.postCreated = functions.firestore
  .document("notebook/{postPath}")
  .onCreate(doc => {
    const post = doc.data();
    const timestamp = admin.firestore.Timestamp.fromDate(new Date()).toDate();
    const date = timestamp.toDateString();

    const notification = {
      type: "post",
      title: `${post.title}`,
      content: "Created a new post!",
      date: date,
      timestamp: timestamp
    };

    return createNotification(notification);
  });
