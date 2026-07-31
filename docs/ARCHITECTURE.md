# Architecture

## Overview

The Smart Expense Tracker API follows a layered architecture to separate responsibilities and improve maintainability, readability, and scalability.

The application is built using Node.js and Express.js with file-based JSON storage instead of a database, as required by the assignment.

---

# High-Level Architecture

```
                Client
                   │
                   ▼
          Express Routes
                   │
                   ▼
            Controllers
                   │
                   ▼
              Services
                   │
                   ▼
            File Utility
                   │
                   ▼
          expenses.json
```

---

# Request Lifecycle

The following diagram illustrates how a request flows through the application:

```
                     HTTP Request
                           │
                           ▼
                    Express Route
                           │
                           ▼
                Validation Middleware
                           │
                           ▼
                      Controller
                           │
                           ▼
                        Service
                           │
                           ▼
                      File Utility
                           │
                           ▼
                    expenses.json
                           │
                           ▼
                     HTTP Response
```

---


# Request Flow

A request passes through the following layers:

1. Client sends an HTTP request.
2. Express Route matches the endpoint.
3. Validation middleware validates incoming data.
4. Controller receives the validated request.
5. Controller calls the appropriate Service.
6. Service performs business logic.
7. File Utility reads or writes the JSON file.
8. Controller sends the response.
9. Error middleware handles any unexpected errors.

---

# Folder Structure

```
smart-expense-tracker-api/

README.md
AI_NOTES.md

docs/
    PROJECT_DESIGN.md
    API_SPEC.md
    DEVELOPMENT_PLAN.md
    ARCHITECTURE.md

src/
    app.js
    server.js

    routes/
    controllers/
    services/
    middleware/
    utils/
    data/
    config/

tests/
```

---

# Responsibilities

## Routes

Responsibilities

- Define API endpoints
- Connect requests to controllers

Contains no business logic.

---

## Controllers

Responsibilities

- Receive HTTP requests
- Extract request parameters
- Call services
- Return HTTP responses

Controllers should remain thin.

---

## Services

Responsibilities

- Implement business logic
- Perform calculations
- Handle filtering
- Coordinate data operations

Services should never directly manage HTTP requests.

---

## Utilities

Responsibilities

- Read JSON file
- Write JSON file
- Handle file system operations

Keeping file operations isolated makes future migration to a database easier.

---

## Middleware

Responsibilities

- Validate requests
- Handle errors
- Process middleware before controllers

---

# Data Flow

```
Client

↓

Route

↓

Validation

↓

Controller

↓

Service

↓

JSON File

↓

Service

↓

Controller

↓

Response
```

---

# Error Handling Strategy

A centralized error-handling middleware will be used to ensure:

- Consistent error responses
- Reduced code duplication
- Easier debugging

Example response

```json
{
  "success": false,
  "message": "Expense not found"
}
```

---

# Validation Strategy

Request validation will be implemented using **express-validator**.

Validation includes:

- Required fields
- Positive amount
- Valid date
- Valid title length

---

# Data Storage

Expense data will be stored in:

```
src/data/expenses.json
```

Advantages

- No database required
- Simple persistence
- Easy testing
- Meets assignment requirements

---

# Scalability

Although this project uses JSON storage, the layered architecture allows the storage layer to be replaced with MongoDB, PostgreSQL, or another database in the future without affecting the API design.

---

# Design Principles

The project follows these software engineering principles:

- Separation of Concerns
- Single Responsibility Principle
- Modular Design
- RESTful API Design
- Consistent Error Handling
- Maintainable Code Structure