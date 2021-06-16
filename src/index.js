const path = require("path");
const http = require("http");
const express = require("express");
//requiring socket.io library
const socketio = require("socket.io");
const Filter = require("bad-words");
const app = express();
//create a new http server
const server = http.createServer(app);
//socket.io uses a raw server which we cannot access through express
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicdirectorypath = path.join(__dirname, "../public");

app.use(express.static(publicdirectorypath));

//firing events
io.on("connection", (socket) => {
  console.log("New Web Socket connection");
  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined!");
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    io.emit("message", message);
    callback();
  });
  //in built event
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
  //geolocation event
  socket.on("sendLocation", (obj, callback) => {
    socket.broadcast.emit(
      "message",
      `https://google.com/maps?q=${obj.latitude},${obj.longitude}`
    );
    callback();
  });
});

server.listen(port, () => {
  console.log("Listening to server");
});
