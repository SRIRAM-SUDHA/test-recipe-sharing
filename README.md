# Recipe Sharing Platform

This project is a recipe sharing platform backend API built using Node.js, Express.js, and SQLite. The API allows users to perform CRUD operations on recipes and manage their profiles.

## Project Structure


- **routes/**: Contains route definitions for user and recipe endpoints.
- **middleware/**: Contains authentication middleware.
- **controllers/**: Contains controller logic for handling user and recipe operations.
- **app.js**: Entry point of the application.
- **README.md**: This file, providing an overview of the project.

## How Object-Oriented Programming (OOP) helped in this project

Object-Oriented Programming (OOP) principles have been applied in this project to enhance code organization, reusability, and maintainability.

### User and Recipe Classes

- **User Class**: Represents users of the platform. It encapsulates user-related data and functionalities such as authentication, profile management, etc.
- **Recipe Class**: Represents recipes in the system. It encapsulates recipe-related data and functionalities such as CRUD operations.

### Controller Classes

- **UserController**: Handles user-related operations like signup, login, profile management, etc.
- **RecipeController**: Handles recipe-related operations like creating, updating, deleting, and retrieving recipes.

### Middleware

- **AuthMiddleware**: Implements authentication logic to secure API endpoints. It ensures that only authenticated users can access certain routes.

OOP allows for better code organization, as related functionalities are encapsulated within classes. It also promotes code reusability, as methods defined in classes can be reused across different parts of the application. Additionally, OOP facilitates easier maintenance and scalability of the codebase.

## Getting Started

To run the project locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.
4. Use an API testing tool like Postman to interact with the endpoints.
