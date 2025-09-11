import express from "express";

import httpError from "./middleware/errorHandler.js";
import connectDb from "./db/mongoose.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

// undefined routes

app.use((req, res, next) => {
  const error = res.status(404).json("requested route not found");
  next(new httpError(error));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json(error.message || "something went wrong please try again later");
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("failed to connect");
    }

    app.listen(port, () => {
      console.log("server running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
