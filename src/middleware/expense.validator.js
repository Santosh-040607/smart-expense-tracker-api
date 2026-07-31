const { body, validationResult } = require("express-validator");

const validateExpense = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
      .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters."),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("date")
    .notEmpty()
    .withMessage("Date is required.")
     .bail()
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  validateExpense,
};