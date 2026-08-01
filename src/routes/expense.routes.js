const express = require("express");
const {
  addExpense,
  getExpenses,
  getSummary,
  removeExpense,
} = require("../controllers/expense.controller");

const { validateExpense } = require("../middleware/expense.validator");

const router = express.Router();

/**
 * @swagger
 * /api/expenses/summary:
 *   get:
 *     summary: Get expense summary
 *     description: Returns the total expenses and category-wise totals.
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: Expense summary retrieved successfully.
 */
router.get("/summary", getSummary);

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Returns all expenses or filters them by category using the category query parameter.
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter expenses by category (e.g. Food)
 *     responses:
 *       200:
 *         description: Expenses retrieved successfully.
 */
router.get("/", getExpenses);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     description: Creates a new expense and stores it in the local JSON file.
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 description: Expense title
 *                 example: Lunch
 *               amount:
 *                 type: number
 *                 description: Expense amount
 *                 example: 250
 *               category:
 *                 type: string
 *                 description: Expense category
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Expense date
 *                 example: 2026-08-01
 *     responses:
 *       201:
 *         description: Expense created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: e25bb7ee-a49b-4d92-9621-2a202832be9a
 *                     title:
 *                       type: string
 *                       example: Lunch
 *                     amount:
 *                       type: number
 *                       example: 250
 *                     category:
 *                       type: string
 *                       example: Food
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: 2026-08-01
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation failed.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: field
 *                       value:
 *                         type: string
 *                         example: ""
 *                       msg:
 *                         type: string
 *                         example: Title is required.
 *                       path:
 *                         type: string
 *                         example: title
 *                       location:
 *                         type: string
 *                         example: body
 */
router.post("/", validateExpense, addExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes an expense using its unique ID.
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully.
 *       404:
 *         description: Expense not found.
 */
router.delete("/:id", removeExpense);

module.exports = router;