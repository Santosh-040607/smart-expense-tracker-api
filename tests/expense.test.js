const request = require("supertest");
const app = require("../src/app");
const fs = require("fs");
const path = require("path");

const expensesFile = path.join(
  __dirname,
  "../src/data/expenses.json"
);

const foodExpense = {
  title: "Lunch",
  amount: 250,
  category: "Food",
  date: "2026-08-01",
};

const entertainmentExpense = {
  title: "Movie",
  amount: 400,
  category: "Entertainment",
  date: "2026-08-01",
};

const dinnerExpense = {
  title: "Dinner",
  amount: 300,
  category: "Food",
  date: "2026-08-02",
};

async function createExpense(expense) {
  return request(app)
    .post("/api/expenses")
    .send(expense);
}

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

      const response = await createExpense(foodExpense);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Expense created successfully.");

      expect(response.body.data.id).toEqual(expect.any(String));
      expect(response.body.data.title).toBe(foodExpense.title);
      expect(response.body.data.amount).toBe(foodExpense.amount);
      expect(response.body.data.category).toBe(foodExpense.category);
      expect(response.body.data.date).toBe(foodExpense.date);

      const expenses = JSON.parse(
        fs.readFileSync(expensesFile, "utf-8")
      );

      expect(expenses).toHaveLength(1);
      expect(expenses[0]).toMatchObject(foodExpense);

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

      const expenses = JSON.parse(
        fs.readFileSync(expensesFile, "utf-8")
      );

      expect(expenses).toEqual([]);

    });

  });

  describe("GET /api/expenses?category=Food", () => {

    test("should return only food expenses", async () => {

      await createExpense(foodExpense);
      await createExpense(entertainmentExpense);
      await createExpense(dinnerExpense);

      const response = await request(app)
        .get("/api/expenses?category=Food");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);

      response.body.data.forEach((expense) => {
        expect(expense.category).toBe("Food");
      });

    });

  });

  describe("GET /api/expenses/summary", () => {

    test("should return expense summary", async () => {

      await createExpense(foodExpense);
      await createExpense(entertainmentExpense);
      await createExpense(dinnerExpense);

      const response = await request(app)
        .get("/api/expenses/summary");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.totalExpenses).toBe(950);
      expect(response.body.data.categoryTotals.Food).toBe(550);
      expect(response.body.data.categoryTotals.Entertainment).toBe(400);

    });

  });

  describe("DELETE /api/expenses/:id", () => {

    test("should delete an existing expense", async () => {

      const createResponse = await createExpense(foodExpense);

      const expenseId = createResponse.body.data.id;

      const deleteResponse = await request(app)
        .delete(`/api/expenses/${expenseId}`);

      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
      expect(deleteResponse.body.message)
        .toBe("Expense deleted successfully.");

      const expenses = JSON.parse(
        fs.readFileSync(expensesFile, "utf-8")
      );

      expect(expenses).toHaveLength(0);

    });

  });

  describe("DELETE /api/expenses/:id - Not Found", () => {

    test("should return 404 for non-existing expense", async () => {

      const response = await request(app)
        .delete("/api/expenses/12345678-1234-1234-1234-123456789012");

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message)
        .toBe("Expense not found.");

    });

  });

});