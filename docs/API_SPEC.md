# API Specification

## Base URL

```
/api
```

---

# 1. Create Expense

**Endpoint**

```
POST /api/expenses
```

### Request Body

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-07-31"
}
```

### Success Response

**Status**

```
201 Created
```

### Response

```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {}
}
```

---

# 2. Get All Expenses

```
GET /api/expenses
```

Response

```
200 OK
```

---

# 3. Filter Expenses

```
GET /api/expenses?category=Food
```

Response

```
200 OK
```

---

# 4. Expense Summary

```
GET /api/expenses/summary
```

Returns

- Total Expenses
- Total by Category

---

# 5. Delete Expense

```
DELETE /api/expenses/:id
```

Response

```
204 No Content
```

---

## Error Responses

### Validation Error

```
400 Bad Request
```

```json
{
  "success": false,
  "message": "Validation failed"
}
```

### Expense Not Found

```
404 Not Found
```

```json
{
  "success": false,
  "message": "Expense not found"
}
```

### Internal Server Error

```
500 Internal Server Error
```

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```