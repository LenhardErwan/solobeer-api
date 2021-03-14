# Routes

Routes respects different HTTP Methods for CRUD execution: GET to read, POST to create, PUT to update and DELETE to delete.

Every routes is secured and requires a valid token except the `/login` route which provides an authentification endpoint.

## Overview

List of available routes and methods:

| EndPoint            | HTTP Methods     | Require Token |
| ------------------- | ---------------- | ------------- |
| /api/auth/          | POST             | YES           |
| /api/auth/login     | POST             | NO            |
| /api/beers          | GET, POST        | YES           |
| /api/beers/:id      | GET, PUT, DELETE | YES           |
| /api/containers     | GET, POST        | YES           |
| /api/containers/:id | GET, PUT, DELETE | YES           |

---

## Auth

### Create User

**Endpoint**: `/api/auth/`  
**Methods**: POST  
**Require Token**: YES  
**Headers**: Authorization  
**Body**: JSON

```json
{
  "pseudo": "a-pseudo",
  "password": "a-password"
}
```

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "success": true
}
```

- **Status**: 409
- **Body**: JSON

```json
{
  "error": "User with this pseudo already exist",
  "pseudo": "the requested pseudo"
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Login User

**Endpoint**: `/api/auth/login`  
**Methods**: POST  
**Require Token**: YES  
**Body**: JSON

```json
{
  "pseudo": "a-pseudo",
  "password": "a-password"
}
```

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "token": "the-token"
}
```

- **Status**: 401
- **Body**: JSON

```json
{
  "error": "Wrong parameters"
}
```

- **Status**: 400
- **Body**: JSON

```json
{
  "error": "Missing parameters"
}
```

---

## Beers

### Get all Beers

**Endpoint**: `/api/beers/:id`  
**Methods**: GET  
**Require Token**: YES  
**Headers**: Authorization

**Return**:

- **Status**: 200
- **Body**: JSON

```json
[
  {
    "id": 1,
    "name": "a-name",
    "abv": 1.0,
    "containers": [
      {
        "id": 1,
        "name": "a-name",
        "volume": 0.0
      }
    ]
  }
]
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No beer found"
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Get a Beer

**Endpoint**: `/api/beers/:id`  
**Methods**: GET  
**Require Token**: YES  
**Headers**: Authorization

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "id": 1,
  "name": "a-name",
  "abv": 1.0,
  "containers": [
    {
      "id": 1,
      "name": "a-name",
      "volume": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No beer found with this id",
  "id": 1
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Create Beer

**Endpoint**: `/api/beers/`  
**Methods**: POST  
**Require Token**: YES  
**Headers**: Authorization  
**Body**: JSON

```json
{
  "name": "a-name",
  "abv": 1.0,
  "containers": [{ "id": 1 }]
}
```

**Return**:

- **Status**: 201
- **Headers**: Location
- **Body**: JSON

```json
{
  "id": 1,
  "name": "a-name",
  "abv": 1.0,
  "containers": [
    {
      "id": 1,
      "name": "a-name",
      "volume": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No beer found"
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Update a Beer

**Endpoint**: `/api/beers/:id`  
**Methods**: PUT  
**Require Token**: YES  
**Headers**: Authorization  
**Body**: JSON

```json
{
  "name": "another-name",
  "abv": 2.0,
  "containers": [{ "id": 2 }]
}
```

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "id": 1,
  "name": "another-name",
  "abv": 2.0,
  "containers": [
    {
      "id": 2,
      "name": "a-name",
      "volume": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No beer found with this id",
  "id": 1
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Delete a Beer

**Endpoint**: `/api/beers/:id`  
**Methods**: DELETE  
**Require Token**: YES  
**Headers**: Authorization

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "id": 1,
  "name": "a-name",
  "abv": 1.0,
  "containers": [
    {
      "id": 1,
      "name": "a-name",
      "volume": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No beer found with this id",
  "id": 1
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

---

## Containers

### Get all Containers

**Endpoint**: `/api/containers`  
**Methods**: GET  
**Require Token**: YES  
**Headers**: Authorization

**Return**:

- **Status**: 200
- **Body**: JSON

```json
[
  {
    "id": 1,
    "name": "a-name",
    "volume": 1.0,
    "beers": [
      {
        "id": 1,
        "name": "a-name",
        "abv": 0.0
      }
    ]
  }
]
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No container found"
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Get a Container

**Endpoint**: `/api/containers/:id`  
**Methods**: GET  
**Require Token**: YES  
**Headers**: Authorization

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "id": 1,
  "name": "a-name",
  "volume": 1.0,
  "beers": [
    {
      "id": 1,
      "name": "a-name",
      "abv": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No container found with this id",
  "id": 1
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Create Container

**Endpoint**: `/api/containers`  
**Methods**: POST  
**Require Token**: YES  
**Headers**: Authorization  
**Body**: JSON

```json
{
  "name": "a-name",
  "volume": 1.0,
  "beers": [{ "id": 1 }]
}
```

**Return**:

- **Status**: 201
- **Headers**: Location
- **Body**: JSON

```json
{
  "id": 1,
  "name": "a-name",
  "volume": 1.0,
  "beers": [
    {
      "id": 1,
      "name": "a-name",
      "abv": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No container found"
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Update a Container

**Endpoint**: `/api/containers/:id`  
**Methods**: PUT  
**Require Token**: YES  
**Headers**: Authorization  
**Body**: JSON

```json
{
  "name": "another-name",
  "volume": 2.0,
  "beers": [{ "id": 2 }]
}
```

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "id": 1,
  "name": "another-name",
  "volume": 2.0,
  "beers": [
    {
      "id": 2,
      "name": "other-name",
      "abv": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No container found with this id",
  "id": 1
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```

### Delete a Container

**Endpoint**: `/api/containers/:id`  
**Methods**: DELETE  
**Require Token**: YES  
**Headers**: Authorization

**Return**:

- **Status**: 200
- **Body**: JSON

```json
{
  "id": 1,
  "name": "a-name",
  "volume": 1.0,
  "beers": [
    {
      "id": 1,
      "name": "a-name",
      "abv": 0.0
    }
  ]
}
```

- **Status**: 404
- **Body**: JSON

```json
{
  "error": "No container found with this id",
  "id": 1
}
```

- **Status**: 500
- **Body**: JSON

```json
{
  "error": "Something bad has happened! Please contact the administrator"
}
```
