const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://piedra-papel-tijeras-online.firebaseio.com",
});

function createUser(email, password) {
  admin
    .auth()
    .createUser({
      email: email,
      password: password,
    })
    .then((userRecord) => {
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
}

createUser("testuser@example.com", "password123");
