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

module.exports = {
  createExpense,
};