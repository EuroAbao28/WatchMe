const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();
require("colors");

const port = process.env.PORT || 5000;

// connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// call the connectDB
connectDB();

// middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/activityStats", require("./routes/activityStatsRoute"));

// setup socket.io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://watch-me.vercel.app",
    methods: ["GET", "POST"],
  },
});

let activeUsers = 0;

// socket.io event
io.on("connection", (socket) => {
  activeUsers++;
  console.log(`User connected: ${socket.id}. Active: ${activeUsers}`);

  // notify all clients
  io.emit("activeUsers", activeUsers);

  // if someone connect, update call from the frontend, to update the database
  io.emit("updateVisits");

  socket.on("updateWatched", () => {
    console.log("Received updateWatched event");
    socket.broadcast.emit("setUpdateWatched");
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    activeUsers--;
    console.log(
      `User disconnected: ${socket.id}. Active users: ${activeUsers}`
    );

    // Notify all clients about the updated active user count
    io.emit("activeUsers", activeUsers);
  });
});

// lister to port
server.listen(port, () =>
  console.log(`Server running on port: ${port}`.yellow.underline)
);
