const dotenv = require("dotenv");
dotenv.config({ path: "./env/.dev.env" });

const express = require("express");
const HttpError = require("./middleware/errorHandler");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

app.use((req, res, next) => {
  return next(new HttpError("requested route not found"));
});

app.use((error, req, res, next) => {
  if (req.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json(error.message || "something went wrong try again later");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port${port}`);
});
