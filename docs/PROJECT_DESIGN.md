# Smart Expense Tracker API - Project Design

## Project Goal

Build a RESTful API to manage personal expenses using Node.js and Express.js. Expense data will be stored in a local JSON file without using a database.

---

## Functional Requirements

The API should support:

- Add a new expense
- Retrieve all expenses
- Filter expenses by category
- Calculate total expenses
- Delete an expense

---

## Technology Stack

- Node.js
- Express.js
- Local JSON File Storage
- Jest
- Supertest
- Express Validator
- Swagger (Bonus Feature)

---

## High-Level Architecture

Client
↓
Routes
↓
Controllers
↓
Services
↓
File Utility
↓
expenses.json

---

## Design Decisions

### Local JSON Storage

The assignment specifies that no database is required. A local JSON file provides simple persistent storage while keeping the implementation lightweight.

### Layered Architecture

The application follows a layered architecture:

- Routes handle endpoint definitions.
- Controllers process HTTP requests and responses.
- Services contain business logic.
- Utilities manage file operations.

This separation improves maintainability and readability.

### Validation

Request validation will be implemented using express-validator to ensure only valid expense data is accepted.

### Error Handling

A centralized error-handling middleware will provide consistent API responses and reduce duplicated error handling logic.

### Documentation

Swagger/OpenAPI will be added as the optional bonus feature to provide interactive API documentation.

---

## Expense Model

Each expense contains:

- id
- title
- amount
- category
- date

---

## Expected Project Structure

README.md

AI_NOTES.md

src/

tests/

docs/