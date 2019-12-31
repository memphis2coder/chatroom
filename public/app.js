// make connection
const socket = io.connect("http://localhost:3000");

// DOM
const output = document.getElementById("output");
const handle = document.getElementById("handle");
const message = document.getElementById("message");
const btn = document.getElementById("send");
const feedback = document.getElementById("feedback");

// events
btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

// listen for typing event
message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value);
});

// listen for events
socket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
