import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const publicDirectory = join(__dirName, "./public");

app.use(express.static(publicDirectory));

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new websocket connection established");

  io.emit("newConnection", "a new user joined");

  socket.emit("message", "welcome");

  socket.on("sendMessage", (msg) => {
    console.log(msg);
  });

  socket.on("location", (lat, lon) => {
    socket.emit("message", `https://google.com/maps?q=${lat},${lon}`);
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`server running on port`, port);
});
