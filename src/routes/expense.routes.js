const express = require("express");
const { addExpense } = require("../controllers/expense.controller");
const { validateExpense } = require("../middleware/expense.validator");

const router = express.Router();

router.post("/", validateExpense, addExpense);

module.exports = router;