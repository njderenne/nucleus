# Nucleus API Documentation

Complete API reference for the Nucleus backend.

## 🔐 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user_id": "uuid",
  "email": "user@example.com"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** Same as register

## 👤 Users

### Get Current User

```http
GET /api/users/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

## 🏠 Pantry

### Get All Pantry Items

```http
GET /api/pantry/
Authorization: Bearer <token>
```

### Create Pantry Item

```http
POST /api/pantry/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Milk",
  "category": "dairy",
  "quantity": 1,
  "unit": "gallon",
  "expiration_date": "2024-12-31",
  "location": "fridge",
  "notes": "Organic whole milk"
}
```

### Update Pantry Item

```http
PUT /api/pantry/{item_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

### Delete Pantry Item

```http
DELETE /api/pantry/{item_id}
Authorization: Bearer <token>
```

## 💰 Budget

### Get All Transactions

```http
GET /api/budget/transactions
Authorization: Bearer <token>
```

### Create Transaction

```http
POST /api/budget/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "expense",
  "amount": 50.00,
  "category": "groceries",
  "description": "Weekly shopping",
  "date": "2024-01-01"
}
```

### Get Budgets

```http
GET /api/budget/budgets
Authorization: Bearer <token>
```

### Create Budget

```http
POST /api/budget/budgets
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "groceries",
  "monthly_limit": 500.00,
  "year": "2024",
  "month": "01"
}
```

## 🎯 Hunting

### Get Locations

```http
GET /api/hunting/locations
Authorization: Bearer <token>
```

### Create Location

```http
POST /api/hunting/locations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Oak Stand #1",
  "type": "stand",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "description": "Oak tree stand near creek",
  "notes": "Best in morning"
}
```

### Get Sightings

```http
GET /api/hunting/sightings
Authorization: Bearer <token>
```

### Create Sighting

```http
POST /api/hunting/sightings
Authorization: Bearer <token>
Content-Type: application/json

{
  "species": "deer",
  "count": 2,
  "date": "2024-01-01T08:00:00Z",
  "gender": "doe",
  "description": "Two does feeding",
  "weather": "clear",
  "temperature": 45.0
}
```

## 📸 Photos

### Get All Photos

```http
GET /api/photos/
Authorization: Bearer <token>
```

### Create Photo

```http
POST /api/photos/
Authorization: Bearer <token>
Content-Type: application/json

{
  "file_path": "/uploads/photo.jpg",
  "file_name": "sunset.jpg",
  "file_size": 2048000,
  "latitude": 40.7128,
  "longitude": -74.0060,
  "location_name": "Central Park",
  "taken_at": "2024-01-01T18:00:00Z",
  "tags": ["sunset", "nature"],
  "description": "Beautiful sunset"
}
```

## 🤖 AI Assistant

### Chat with AI

```http
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "What should I cook for dinner?"
}
```

**Response:**
```json
{
  "message": "Based on your pantry inventory, I suggest...",
  "user_id": "uuid"
}
```

### Generate Summary

```http
POST /api/ai/summarize
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Long text to summarize..."
}
```

## 📅 Calendar

Coming soon!

## 🔍 Error Responses

All endpoints may return these error responses:

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 404 Not Found
```json
{
  "detail": "Item not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## 🔗 Interactive Documentation

Visit http://localhost/docs for interactive Swagger UI documentation where you can test all endpoints.

---

For more information, see the [README.md](../README.md)

