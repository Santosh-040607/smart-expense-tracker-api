const { createExpense,getAllExpenses,getExpenseSummary, deleteExpense,
 } = require("../services/expense.service");

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
/**
 * Get all expenses.
 */
async function getExpenses(req, res, next) {
  try {
     const { category } = req.query;
    const expenses = await getAllExpenses(category);

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
}



/**
 * Get expense summary.
 */
async function getSummary(req, res, next) {
  try {
    const summary = await getExpenseSummary();

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}



/**
 * Delete an expense by ID.
 */
async function removeExpense(req, res, next) {
  try {
    const { id } = req.params;

    await deleteExpense(id);

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}



module.exports = {
  addExpense,
   getExpenses,
   getSummary,
   removeExpense,



};