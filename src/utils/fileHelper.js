const fs = require("fs").promises;
const path = require("path");

// Absolute path to the expenses data file
const expensesFilePath = path.join(__dirname, "../data/expenses.json");

/**
 * Reads all expenses from the JSON file.
 *
 * @returns {Promise<Array>} Array of expense objects.
 */
async function readExpenses() {
  try {
    const data = await fs.readFile(expensesFilePath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    /*
      If the file doesn't exist yet,
      return an empty array instead of crashing.
    */
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

/**
 * Writes the updated expense array to the JSON file.
 *
 * @param {Array} expenses
 */
async function writeExpenses(expenses) {
  await fs.writeFile(
    expensesFilePath,
    JSON.stringify(expenses, null, 2)
  );
}

module.exports = {
  readExpenses,
  writeExpenses,
};