# Sam Client 🌻

Client for [Sam API](https://github.com/ssamkough/sam-api).

## Prerequisites 📋

Install all node packages via yarn:

`yarn`

### Firebase

Install Firebase tools globally via npm:
`npm install -g firebase-tools`

Login to Firebase with credentials:
`firebase login`

Initialize/sync firebase directory w/ Firebase project:
`firebase init`

Input answers to firebase initialization steps:
`y, Functions & Hosting, select existing firebase project, Javascript, n, y, build, y`

Build project:
`yarn build`

Deploy project:
`firebase deploy`

## CI/CD

### [Travis CI](https://travis-ci.org/)

Since we have Travis CI, we don't need to manually deploy to Firebase. Once we push to our branch, Travis gets triggered and builds our project and sends it to Firebase.

If we create or remove a cloud function, there are extra steps that are necessary to build the application which is when we might need manually deploy our app.

## Technologies

- [React](https://reactjs.org/)

### Specific

- [Redux](https://redux.js.org/)
- [Materialize](https://materializecss.com/)

## Resources 👏

- [The Net Ninja - React, Redux & Firebase App Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3)
