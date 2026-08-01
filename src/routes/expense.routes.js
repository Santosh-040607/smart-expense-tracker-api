const express = require("express");
const { addExpense,getExpenses } = require("../controllers/expense.controller");
const { validateExpense } = require("../middleware/expense.validator");

const router = express.Router();
router.get("/", getExpenses);
router.post("/", validateExpense, addExpense);

module.exports = router;