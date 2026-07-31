const express = require("express");
const expenseRoutes = require("./routes/expense.routes");
const errorHandler = require("./middleware/error.middleware");
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
app.use("/api/expenses", expenseRoutes);

// Error middleware should always be registered last
app.use(errorHandler);

module.exports = app;