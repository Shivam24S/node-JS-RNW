import express from "express";

import dotenv from "dotenv";
import fileRouter from "./routes/fileRoutes.js";

dotenv.config({ path: "./.dev.env" });

const app = express();

app.use(express.json());

app.use("/file", fileRouter);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

const port = 5000;

app.listen(port, () => {
  console.log("server listening on port", port);
});
