import gql from "graphql-tag";
const typeDefs = gql`
  type User {
      _id: ID!
      username: String!
      email: String!
      bookCount: Int
      savedBooks: [Book]!
  }

  type Book {
    bookId: String!
    authors: [String]!
    description: String
    title: String!
    image: String
    link: String
  }
  
  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    saveBook(bookId: String!, authors: [String], description: String, title: String!, image: String, link: String): User

    login(email: String!, password: String!): Auth

    removeBook(bookId: String!): User
  }
  `;

export default typeDefs;
