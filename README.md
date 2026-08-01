# Smart Expense Tracker API

A RESTful Expense Tracker API built with Node.js and Express.js following a clean layered architecture. The API allows users to create, retrieve, filter, summarize, and delete expenses. It also includes request validation, centralized error handling, automated integration tests, and interactive API documentation using Swagger.

## Features
- Create a new expense
- Retrieve all expenses
- Filter expenses by category
- View expense summary with category-wise totals
- Delete an expense by ID
- Request validation using Express Validator
- Centralized error handling
- File-based data persistence using JSON
- Integration testing with Jest and Supertest
- Interactive API documentation using Swagger UI

## Tech Stack
- Node.js
- Express.js
- Express Validator
- Swagger (OpenAPI)
- Jest
- Supertest
- Nodemon
 
## Project Structure

```text
smart-expense-tracker-api/
│
├── src/
│   ├── config/
│   │   └── swagger.js
│   ├── controllers/
│   │   └── expense.controller.js
│   ├── data/
│   │   └── expenses.json
│   ├── middleware/
│   │   ├── error.middleware.js
│   │   └── expense.validator.js
│   ├── routes/
│   │   └── expense.routes.js
│   ├── services/
│   │   └── expense.service.js
│   ├── utils/
│   │   └── fileHelper.js
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── expense.test.js
│
├── README.md
├── AI_NOTES.md
├── package.json
└── .gitignore
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/Santosh-040607/smart-expense-tracker-api.git
```

2. Navigate to the project

```bash
cd smart-expense-tracker-api
```

3. Install dependencies

```bash
npm install
```

## Running the Application

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

The server starts at:

```text
http://localhost:3000
```

## Running Tests

Run the integration test suite:

```bash
npm test
```

The test suite covers:

- GET /api/expenses
- POST /api/expenses
- Validation for invalid requests
- Category filtering
- Expense summary
- Delete expense
- Delete non-existing expense

## API Documentation

Interactive API documentation is available through Swagger UI.

After starting the application, open:

```text
http://localhost:3000/api-docs
```

Swagger allows you to:

- View all available endpoints
- Execute API requests directly from the browser
- Inspect request and response schemas

## API Endpoints

| Method | Endpoint                      | Description                 |
|--------|------------------------------ |-----------------------------|
| POST   | `/api/expenses`               | Create a new expense        |
| GET    | `/api/expenses`               | Retrieve all expenses       |
| GET    | `/api/expenses?category=Food` | Filter expenses by category |
| GET    | `/api/expenses/summary`       | Retrieve expense summary    |
| DELETE | `/api/expenses/:id`           | Delete an expense           |


## Sample Request

```http
POST /api/expenses
```

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-08-01"
}
```
## Sample Response

```json
{
  "success": true,
  "message": "Expense created successfully.",
  "data": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "title": "Lunch",
    "amount": 250,
    "category": "Food",
    "date": "2026-08-01"
  }
}
```
 

## Design Decisions

- This project follows a layered architecture to improve maintainability and separation of concerns.
- Routes define API endpoints.
- Controllers handle HTTP requests and responses.
- Services contain business logic.
- Middleware manages validation and error handling.
- Utilities contain reusable helper functions.
- Data is persisted in a local JSON file.

## Future Improvements
- Possible enhancements include:
- Update expense endpoint(PUT/PATCH)
- Pagination
- Authentication and authorization
- Database integration (MongoDB or PostgreSQL)
- Docker support
- CI/CD pipeline
- Expense analytics dashboard

## Author

**N Santosh**

GitHub: https://github.com/Santosh-040607