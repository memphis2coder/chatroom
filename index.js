const express = require("express");
const socket = require("socket.io");

// app setup
const app = express();

// create server
const server = app.listen(3000, function() {
  console.log("server has started on port 3000");
});

// static files
app.use(express.static("public"));

// socket setup for the backend
const io = socket(server);

io.on("connection", function(socket) {
  console.log("made socket connection", socket.id);

  // listen for the chat message from the client
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  // listen for typing message
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
