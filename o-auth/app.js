import dotenv from "dotenv";

dotenv.config({ path: "./env/.dev.env" });

import express from "express";

import connectDB from "./config/db.js";

const app = express();

app.use(express.json);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
