import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// current file
const __fileName = fileURLToPath(import.meta.url);

// folder
const __dirname = path.dirname(__fileName);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const port = 5000;

app.listen(port, () => {
  console.log("server running on", port);
});
