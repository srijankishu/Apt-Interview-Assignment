import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import Order from "./models/Order.js";
import orderRoutes from "./rotues/Order.routes.js";

dotenv.config();

const app = express();



app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://apt-interview-assignment-cp7fnxbg1-srijan-s-projects-7fb3208a.vercel.app",
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

mongoose.connection.once("open", () => {
  console.log("Watching orders collection...");

  const changeStream = Order.watch([], {
    fullDocument: "updateLookup",
  });

  changeStream.on("change", (change) => {
    io.emit("order-update", {
      operation: change.operationType,
      data: change.fullDocument,
    });
  });
});

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});