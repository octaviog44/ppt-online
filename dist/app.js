// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_3F35SvPHdmCu0LPv_DvN8YxpGs2HIWM",
  authDomain: "piedra-papel-tijeras-online.firebaseapp.com",
  projectId: "piedra-papel-tijeras-online",
  storageBucket: "piedra-papel-tijeras-online.appspot.com",
  messagingSenderId: "663969458711",
  appId: "1:663969458711:web:8e42d65796dda76d080a52",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("create-room-btn").addEventListener("click", () => {
  createRoom();
});

document.getElementById("join-room-btn").addEventListener("click", () => {
  const roomCode = document.getElementById("room-code-input").value;
  joinRoom(roomCode);
});

function createRoom() {
  const roomCode = generateRoomCode();
  db.collection("rooms")
    .doc(roomCode)
    .set({
      users: [],
    })
    .then(() => {
      alert(`Sala creada con el código: ${roomCode}`);
      waitForPlayer(roomCode);
    })
    .catch((error) => {
      console.error("Error creando sala: ", error);
    });
}

function joinRoom(roomCode) {
  db.collection("rooms")
    .doc(roomCode)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let users = doc.data().users;
        users.push(firebase.firestore.FieldValue.serverTimestamp());
        db.collection("rooms")
          .doc(roomCode)
          .update({ users: users })
          .then(() => {
            alert("Te has unido a la sala");
            window.location.href = `game.html?roomCode=${roomCode}`;
          });
      } else {
        alert("Sala no encontrada");
      }
    })
    .catch((error) => {
      console.error("Error uniendo a sala: ", error);
    });
}

function waitForPlayer(roomCode) {
  db.collection("rooms")
    .doc(roomCode)
    .onSnapshot((doc) => {
      if (doc.exists && doc.data().users.length > 1) {
        window.location.href = `game.html?roomCode=${roomCode}`;
      }
    });
}

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
