const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let player = {};
const current_player = "w";

io.on("connection", (socket) => {
  console.log("user connected");
  if (!player.white) {
    player.white = socket.id;
    socket.emit("playerRole", "w");
  } else if (!player.black) {
    player.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    player.s = socket.id;
    socket.emit("playerRole", "s");
  }

  socket.on("disconnect", () => {
    if (socket.id === player.white) {
      delete player.white;
    } else if (socket.id === player.black) {
      delete player.black;
    } else {
      delete player.s;
    }
    console.log("user disconnected");
    console.log(player);
  });
  console.log(player);
  socket.on("turn", (id) => {
    if (id === player.white) {
      io.emit("moveon", "white");
      io.emit("timer", "w");
    } else if (id === player.black) {
      socket.broadcast.emit("moveon", "black");
      io.emit("timer", "b");
    }
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(3006, () => {
  console.log("server listing on http://localhost:3006");
});
