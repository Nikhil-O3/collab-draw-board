import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// HTTP server (required for socket.io)
const httpServer = createServer(app);

// socket server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow frontend
  },
});

// global state (shared)
let elements = [];

// connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // send current state to new user
  socket.emit("init", elements);

  // receive new element
  socket.on("add-element", (element) => {
    elements.push(element);

    // broadcast updated array to all clients
    io.emit("update-elements", elements);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// express routes
app.get("/", (req, res) => {
  res.json({ message: "ok", ip: req.ip });
});

httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});