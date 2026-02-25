const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Proper Production CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-system-teal-phi.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Task Management API Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});