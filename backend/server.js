const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();   // ✅ App yahan declare hoga

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Task Management API Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));  // ✅ yahan hona chahiye

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});