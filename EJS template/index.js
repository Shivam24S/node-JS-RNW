import express, { urlencoded } from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

let students = [
  { id: 1, name: "shiva" },
  { id: 2, name: "ramesh" },
];

app.get("/", (req, res) => {
  res.render("index", { students });
});

// add student

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
  };

  students.push(newStudent);
  res.redirect("/");
});

// update

app.get("/edit/:id", (req, res) => {
  const studentId = parseInt(req.params.id);

  const student = students.find((student) => student.id === studentId);

  if (!student) {
    res.status(404).json("student not found");
  }

  res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const student = students.find((s) => s.id === id);

  student.name = name;

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter((s) => s.id !== id);
  res.redirect("/");
});

const port = 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
