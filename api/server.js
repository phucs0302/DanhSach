const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

const app = express();
app.use(cors());
app.use(express.json());

// Auth
app.use("/api/auth", authRoutes);

// Students
app.use("/api/sinhvien", studentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log("Server running on " + PORT);
});
