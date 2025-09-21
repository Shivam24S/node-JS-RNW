import express from "express";

import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

const port = 5000;

const startServer = async () => {
  try {
    const connect = await connectDb();

    if (!connect) {
      return console.log("failed to connect db");
    }

    console.log("db connected");
    app.listen(port, () => {
      console.log("server running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
