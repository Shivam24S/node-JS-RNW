import express from "express";

import connectDb from "./db/mongoose.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());

app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

const port = 5000;

const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, async () => {
      try {
        await connectDb();

        console.log("server running on port", port);
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
