import express from "express";

const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "shiva" },
  {
    id: 2,
    name: "rahul",
  },
];

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/students", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json("student data not found");
  }

  res.status(200).json({ message: "student data found", students });
});

app.get("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((std) => std.id === id);

  if (!student) {
    return res.status(404).json("student not found with this id");
  }

  res.status(200).json({ message: "student found", student });
});

app.post("/student/add", (req, res) => {
  console.log(req.body.name);

  const newStudent = {
    id: new Date().getTime(),
    name: req.body,
  };

  students.push(newStudent);

  res.status(201).json({ message: "student data added", newStudent });
});

app.patch("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((std) => std.id === id);

  if (index == -1) {
    return res.status(404).json("student data not found");
  }

  students[index] = { ...students[index], ...req.body };

  res.status(200).json({
    message: "student data updated successfully",
    student: students[index],
  });
});

app.delete("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // students = students.filter((std) => std.id !== id);

  // res.status(200).json({ message: "student data deleted" });

  const index = students.findIndex((std) => std.id === id);

  if (index == -1) {
    return res.status(404).json("student data not found with this id");
  }

  const deleteStudent = students[index];

  students.splice(index, 1);

  res.status(200).json({ message: "student data deleted", deleteStudent });
});

const port = 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
