import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateMessage, locationMessage } from "./utils/messages.js";
import {
  getUser,
  addUser,
  removeUser,
  getUserInChatRoom,
} from "./utils/users.js";

const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const publicDirectory = join(__dirName, "./public");

app.use(express.static(publicDirectory));

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new websocket connection established");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    if (user) {
      socket.join(user.room);
    }
    socket
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined`));

    io.to(user.room).emit(
      "message",
      generateMessage(`welcome ${user.username}`)
    );

    io.emit("roomData", {
      room: user.room,
      users: getUserInChatRoom(user.room),
    });
  });

  socket.on("sendMessage", (msg, callback) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", generateMessage(user.username, msg));
      callback("message a received");
    }
  });

  socket.on("location", (lat, lon, callback) => {
    const user = getUser(socket.id);

    if (user) {
      socket
        .to(user.room)
        .emit(
          "location",
          locationMessage(
            user.username,
            `https://google.com/maps?q=${lat},${lon}`
          )
        );
      callback("location received");
    }
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);

    if (user) {
      socket.broadcast
        .to(user.room)
        .emit("message", `${user.username} has left`);

      removeUser(socket.id);

      io.emit("roomData", {
        room: user.room,
        users: getUserInChatRoom(user.room),
      });
    }
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`server running on port`, port);
});
