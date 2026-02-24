const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware"); // ✅ NOT { authorize }
const { getEmployees } = require("../controllers/userController");

router.get("/employees", protect, authorize("admin"), getEmployees);

module.exports = router;