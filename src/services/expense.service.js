const { randomUUID } = require("crypto");
const {
  readExpenses,
  writeExpenses,
} = require("../utils/fileHelper");

/**
 * Creates a new expense and stores it.
 *
 * @param {Object} expenseData
 * @returns {Promise<Object>}
 */
async function createExpense(expenseData) {
  const expenses = await readExpenses();

  const newExpense = {
    id: randomUUID(),
    ...expenseData,
  };

  expenses.push(newExpense);

  await writeExpenses(expenses);

  return newExpense;
}
/**
 * Retrieve expenses.
 * If a category is provided, return only matching expenses.
 *
 * @param {string} category
 * @returns {Promise<Array>}
 */
async function getAllExpenses(category) {
  const expenses = await readExpenses();

  if (!category) {
    return expenses;
  }

  return expenses.filter(
    (expense) =>
      expense.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Calculate expense summary.
 *
 * @returns {Promise<Object>}
 */
async function getExpenseSummary() {
  const expenses = await readExpenses();

  const summary = expenses.reduce(
    (accumulator, expense) => {
      accumulator.totalExpenses += expense.amount;

      if (!accumulator.categoryTotals[expense.category]) {
        accumulator.categoryTotals[expense.category] = 0;
      }

      accumulator.categoryTotals[expense.category] += expense.amount;

      return accumulator;
    },
    {
      totalExpenses: 0,
      categoryTotals: {},
    }
  );

  return summary;
}


/**
 * Delete an expense by ID.
 *
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function deleteExpense(id) {
  const expenses = await readExpenses();

  // Check if expense exists
  const expenseExists = expenses.some((expense) => expense.id === id);

  if (!expenseExists) {
    const error = new Error("Expense not found.");
    error.statusCode = 404;
    throw error;
  }

  // Remove the matching expense
  const updatedExpenses = expenses.filter(
    (expense) => expense.id !== id
  );

  await writeExpenses(updatedExpenses);

  return true;
}


module.exports = {
   createExpense,
   getAllExpenses,
   getExpenseSummary,
   deleteExpense,


};