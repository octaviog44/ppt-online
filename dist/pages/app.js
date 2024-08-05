// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_3F35SvPHdmCu0LPv_DvN8YxpGs2HIWM",
  authDomain: "piedra-papel-tijeras-online.firebaseapp.com",
  databaseURL:
    "https://piedra-papel-tijeras-online-default-rtdb.firebaseio.com",
  projectId: "piedra-papel-tijeras-online",
  storageBucket: "piedra-papel-tijeras-online.appspot.com",
  messagingSenderId: "663969458711",
  appId: "1:663969458711:web:8e42d65796dda76d080a52",
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Crear Sala
document.getElementById("crear-sala-btn").addEventListener("click", crearSala);

// Unirse a Sala
document.getElementById("unirse-sala-btn").addEventListener("click", () => {
  const codigoSala = document.getElementById("codigo-input").value;
  const salaRef = db.ref("salas/" + codigoSala);

  salaRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data.estado === "esperando") {
        salaRef
          .set({
            ...data,
            jugador2: "jugador2_id",
            estado: "completo",
          })
          .then(() => {
            window.location.href = "jugar.html"; // Cambia a la página de instrucciones
          });
      } else {
        alert("La sala ya está completa.");
      }
    } else {
      alert("Código de sala no válido.");
    }
  });
});
