import express from "express";

import httpError from "./middleware/errorHandler.js";
import connectDb from "./db/connectDb.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

app.use("/task", taskRouter);

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (req.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json(error.message || "something went wrong try again");
});

const port = 5000;

const startServer = async () => {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("connection failed");
    }

    app.listen(port, () => {
      console.log("server listening on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
