const { createExpense } = require("../services/expense.service");

/**
 * Create a new expense.
 */
async function addExpense(req, res, next) {
  try {
    const expense = await createExpense(req.body);

    return res.status(201).json({
      success: true,
      message: "Expense created successfully.",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addExpense,
};