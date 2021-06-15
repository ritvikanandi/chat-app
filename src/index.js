const path = require("path");
const http = require("http");
const express = require("express");
//requiring socket.io library
const socketio = require("socket.io");
const app = express();
//create a new http server
const server = http.createServer(app);
//socket.io uses a raw server which we cannot access through express
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicdirectorypath = path.join(__dirname, "../public");

app.use(express.static(publicdirectorypath));

//firing events
io.on("connection", () => {
  console.log("New Web Socket connection");
});

server.listen(port, () => {
  console.log("Listening to server");
});
