import express from "express";

const app = express();

const port = 5000;

app.set("view engine", "ejs");

let students = [
  { id: 1, name: "Ramesh", age: 20 },
  { id: 2, name: "shiva", age: 22 },
];

// home page
app.get("/", (req, res) => {
  res.render("index", { students });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`server running on port ${port}`);
});
