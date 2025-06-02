# Book Review API

A RESTful API built with Node.js, Express, and MongoDB to manage users, books, and reviews. Supports authentication, authorization, rate limiting, and CRUD operations.

---

## Features

- User registration, login, and logout with JWT authentication
- Book creation, retrieval, update, and deletion
- Review management with ownership checks
- Search books by title or author (case-insensitive, partial match)
- Rate limiting to prevent DoS attacks
- Middleware for authentication and authorization

---

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Middleware (Authentication, Authorization, Rate Limiting)

---

## API Endpoints

### User Routes

| Method | Endpoint           | Description           | Authentication |
|--------|--------------------|-----------------------|----------------|
| POST   | `/api/user/register` | Register a new user   | No             |
| POST   | `/api/user/login`    | Login user            | No             |
| GET    | `/api/user/logout`   | Logout user           | Yes            |

### Book Routes

| Method | Endpoint                     | Description                     | Authentication | Rate Limiting | Ownership Check |
|--------|------------------------------|---------------------------------|----------------|---------------|-----------------|
| GET    | `/api/book/allbooks`          | Get all books                   | Yes            | No            | No              |
| GET    | `/api/book/getbook/:id`       | Get a book by ID                | Yes            | No            | No              |
| GET    | `/api/book/searchbooks?q=key` | Search books by title/author    | Yes            | No            | No              |
| POST   | `/api/book/newbook`           | Create a new book               | Yes            | Yes           | No              |
| PUT    | `/api/book/updatebook/:id`    | Update book by ID               | Yes            | Yes           | Yes             |
| DELETE | `/api/book/deletebook/:id`    | Delete book by ID               | Yes            | Yes           | Yes             |

### Review Routes

| Method | Endpoint                      | Description                   | Authentication | Ownership Check |
|--------|-------------------------------|------------------------------|----------------|-----------------|
| POST   | `/api/review/newreview/:id`    | Create a review for a book   | Yes            | No              |
| PUT    | `/api/review/updatereview/:id` | Update a review by ID        | Yes            | Yes             |
| DELETE | `/api/review/deletereview/:id` | Delete a review by ID        | Yes            | Yes             |

---

## Rate Limiting

- Rate limiting middleware is implemented to prevent abuse and DoS attacks.
- Limits the number of requests to sensitive endpoints such as book creation, update, and deletion.
- Exceeding the limit returns a `429 Too Many Requests` response.

---

## Setup & Run Locally

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/book-review-api.git
   

   ```
2 . Run 
    ```
    node index.js
   ```

![Screenshot (381)](https://github.com/user-attachments/assets/c77ac10a-64de-412b-929b-32aa13bf8e7e)

