const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Expense Tracker API is running."
  });
});

module.exports = app;