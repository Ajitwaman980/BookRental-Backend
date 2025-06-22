# Book Rental Backend

The Book Rental API is a production-grade RESTful backend built with Node.js, Express.js, and MongoDB. It provides a complete system for user authentication, book listing, and book rental management. Designed with real-world use cases in mind, this API simulates a scalable and secure online book rental platform

## 📌 Problem Statement

Many people have books they don’t use often. Others want to read those books without buying them.  
This API lets users **share their books**, **search available books by city or title**, and **rent them for a small fee** — all through a secure and scalable backend.

---

---

## Features

- User registration, login, and logout with JWT authentication
- Book creation, retrieval, update, and deletion
- Review management with ownership checks
- Search books by title or author (case-insensitive, partial match)
- Rate limiting to prevent DoS attacks
- Middleware for authentication and authorization
- Rent a book for a specific number of days

---

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Middleware (Authentication, Authorization, Rate Limiting)
- redis- caching data for better perfromance 

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


### Book Rental Api

| Method | Endpoint                      | Description                   | Authentication | Ownership Check |
|--------|--------------------------------|------------------------------|----------------|-----------------|
| POST   | `/api/book/rent/:id`           |Rent a book                   | Yes            | No              |
| GET    | `/api/book/rent/myrentals`     | View user's rental history   | Yes            | Yes             |
| POST | `/api/book/rent/retrun/:id`      |Return a rented book          | Yes            | Yes             |

---

## Rate Limiting

- Rate limiting middleware is implemented to prevent abuse and DoS attacks.
- Limits the number of requests to sensitive endpoints such as book creation, update, and deletion.
- Exceeding the limit returns a `429 Too Many Requests` response.

---

## Setup & Run Locally

1. Clone the repository

   ```
   git clone https://github.com/Ajitwaman980/Billeasy-Assignment-Book-Review-API-Node.js-.git
   
    node index.js
   ```


![Screenshot (381)](https://github.com/user-attachments/assets/c77ac10a-64de-412b-929b-32aa13bf8e7e)
![Screenshot (422)](https://github.com/user-attachments/assets/dedb1cff-f28b-4aa0-ac71-e43e48f2d193)


