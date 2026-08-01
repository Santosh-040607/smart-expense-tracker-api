const express = require("express");
const { addExpense,getExpenses,getSummary,
 } = require("../controllers/expense.controller");
const { validateExpense } = require("../middleware/expense.validator");

const router = express.Router();

router.get("/summary", getSummary);

router.get("/", getExpenses);

router.post("/", validateExpense, addExpense);

module.exports = router;