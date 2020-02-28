const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

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
    const createdAt = admin.firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    const notification = {
      type: "post",
      title: `${post.title}`,
      content: "Created a new post!",
      date: date,
      created_at: createdAt
    };

    return createNotification(notification);
  });

exports.projectCreated = functions.firestore
  .document("projects/{projectPath}")
  .onCreate(doc => {
    const project = doc.data();
    const createdAt = admin.firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    const notification = {
      type: "project",
      title: `${project.title}`,
      content: "Created a new project!",
      date: date,
      created_at: createdAt
    };

    return createNotification(notification);
  });

exports.serviceCreated = functions.firestore
  .document("services/{servicePath}")
  .onCreate(doc => {
    const service = doc.data();
    const createdAt = admin.firestore.Timestamp.fromDate(new Date()).toDate();
    const date = createdAt.toDateString();

    const notification = {
      type: "service",
      title: `${service.title}`,
      content: "Created a new service!",
      date: date,
      created_at: createdAt
    };

    return createNotification(notification);
  });
