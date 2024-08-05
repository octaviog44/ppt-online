import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://piedra-papel-tijeras-online-default-rtdb.firebaseio.com",
});

// Usa Firestore del Admin SDK
const firestore = admin.firestore();
const rtdb = admin.database();

// Crear una nueva sala de juego
firestore.collection("GameRooms").add({
    player1: "Jugador1", // Nombre del primer jugador
    player2: "Jugador2", // Nombre del segundo jugador
    score: { player1: 0, player2: 0 }, // Puntajes iniciales
    status: "en espera" // Estado de la sala
})
    .then((docRef) => {
        console.log("Sala creada con ID: ", docRef.id); // Muestra el ID de la sala creada
    })
    .catch((error) => {
        console.error("Error al crear la sala: ", error); // Muestra un error si algo sale mal
    });

const verifyAccount = async (email, name) => {
    const usersRef = firestore.collection("Users");

    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
        // Si el email ya existe, verifica el nombre
        const userData = snapshot.docs[0].data();

        if (userData.name === name) {
            console.log("La cuenta ya existe con el mismo nombre y email.");
            return true; // La cuenta ya existe
        } else {
            console.log("El email ya está en uso con otro nombre.");
            return false; // Email en uso, pero con otro nombre
        }
    } else {
        console.log("La cuenta no existe. Puedes registrarte.");
        return false; // No existe la cuenta
    }
};

const registerUser = async (email, name) => {
    const exists = await verifyAccount(email, name);

    if (!exists) {
        // Aquí puedes proceder a crear la cuenta
        await firestore.collection("Users").add({
            email: email,
            name: name,
            createdAt: new Date()
        });
        console.log("Cuenta creada exitosamente.");
    }
};


export { firestore, rtdb };
