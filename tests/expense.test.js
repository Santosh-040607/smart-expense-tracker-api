const request = require("supertest");
const app = require("../src/app");
const fs = require("fs");
const path = require("path");

const expensesFile = path.join(
  __dirname,
  "../src/data/expenses.json"
);

describe("Smart Expense Tracker API", () => {

  beforeEach(() => {
    fs.writeFileSync(expensesFile, JSON.stringify([], null, 2));
  });

  describe("GET /api/expenses", () => {

    test("should return all expenses", async () => {

      const response = await request(app)
        .get("/api/expenses");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

    });

  });

  describe("POST /api/expenses", () => {

    test("should create a new expense", async () => {

      const newExpense = {
        title: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-08-01",
      };

      const response = await request(app)
        .post("/api/expenses")
        .send(newExpense);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Expense created successfully.");

      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.title).toBe(newExpense.title);
      expect(response.body.data.amount).toBe(newExpense.amount);
      expect(response.body.data.category).toBe(newExpense.category);
      expect(response.body.data.date).toBe(newExpense.date);

      // Verify data was written to expenses.json
      const expenses = JSON.parse(
        fs.readFileSync(expensesFile, "utf-8")
      );

      expect(expenses).toHaveLength(1);
      expect(expenses[0].title).toBe("Lunch");
      expect(expenses[0].amount).toBe(250);
      expect(expenses[0].category).toBe("Food");
      expect(expenses[0].date).toBe("2026-08-01");

    });

  });

  describe("POST /api/expenses - Validation", () => {

    test("should reject invalid expense data", async () => {

      const invalidExpense = {
        title: "",
        amount: -100,
        category: "",
        date: "invalid-date",
      };

      const response = await request(app)
        .post("/api/expenses")
        .send(invalidExpense);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed.");
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);

      // Verify no data was written
      const expenses = JSON.parse(
        fs.readFileSync(expensesFile, "utf-8")
      );

      expect(expenses).toEqual([]);

    });

  });

});