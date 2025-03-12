# Book Search Engine with GraphQL

## Description

This project refactors a **Google Books API search engine** from a **RESTful API** to a **GraphQL API** using **Apollo Server**. Built with the **MERN stack**, it features a **React** front end, a **MongoDB** database, and an **Express.js/Node.js** server. Users can search for books, save books to their profile, and manage their saved books.

The application is deployed on **Render** with a **MongoDB Atlas** database.

You can find the deployed app [here](https://book-search-engine-w8wn.onrender.com/).

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [GraphQL Implementation](#graphql-implementation)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

---

## Features

- **Book Search Engine**

  - Users can search for books using the Google Books API.
  - Search results include book title, author, description, cover image, and a link to the book.
  - Users can create an account, log in, and manage their saved books.

- **GraphQL Implementation**
  - **Apollo Server**: Integrated with Express.js for handling queries and mutations.
  - **Authentication Middleware**: Refactored to work in the GraphQL environment.
  - **Apollo Client**: Integrated into the front end for seamless GraphQL queries.

---

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

This will install all required packages, including Apollo Server and MongoDB drivers.

---

## Usage

### Live Deployment

The application is deployed on Render. You can access it here:
[Deployed Application](https://book-search-engine-w8wn.onrender.com/)

### Running Locally

Make sure you first did all the instructions in [Installation](#installation).

1. **Build the app**:

   ```bash
   npm run build
   ```

   The application will run at `http://localhost:3000`.

2. **Start the server**:
    ```bash
    npm run start:dev
    ```
    The application will run at `http://localhost:3000`.

---

## GraphQL Implementation

### Queries

- **GET_ME**: Retrieves the logged-in user's saved books.

### Mutations

- **LOGIN_USER**: Authenticates a user.
- **ADD_USER**: Creates a new user account.
- **SAVE_BOOK**: Saves a book to the user's profile.
- **REMOVE_BOOK**: Removes a book from the user's saved list.

---

## Technologies Used

- **React**: Front-end library for building UI components.
- **Node.js & Express.js**: Backend framework for handling API requests.
- **MongoDB & Mongoose**: NoSQL database for storing user and book data.
- **Apollo Server & Client**: Enables GraphQL queries and mutations.
- **GraphQL**: API query language for efficient data fetching.
- **JWT Authentication**: Ensures secure login and authorization.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch and submit a pull request.

For major changes, please open an issue first to discuss proposed updates.

---

## Questions

If you have any questions, feel free to reach out:

- **Email**: [dllorens28@gmail.com](mailto:dllorens28@gmail.com)
- **GitHub**: [dlastname](https://github.com/dlastname)

---
