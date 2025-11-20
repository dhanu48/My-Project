import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000; // safer than 5173

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Temporary in-memory data
let students = [];

// ➤ Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ➤ Add a student
app.post("/students", (req, res) => {
  const { name, roll, studentClass, totalSubjects, age } = req.body;
  if (!name || !roll || !studentClass || !totalSubjects || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newStudent = {
    id: Date.now(),
    name,
    roll,
    studentClass,
    totalSubjects,
    age,
  };

  students.push(newStudent);
  res.json(newStudent);
});

// ➤ Delete a student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Deleted successfully" });
});

// ➤ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
