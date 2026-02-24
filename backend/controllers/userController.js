const User = require("../models/User");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("name email");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};