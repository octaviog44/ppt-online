const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
