const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const expenseRoutes = require("./routes/expense.routes");
const errorHandler = require("./middleware/error.middleware");


const app = express();

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Health Check Route
app.use("/api/expenses", expenseRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Expense Tracker API is running."
  });
});


// Error middleware should always be registered last
app.use(errorHandler);

module.exports = app;