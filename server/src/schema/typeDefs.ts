const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]!
  }
  
  type Query {
    me: User
  }

  
  
  
  
  
  `;

  export default typeDefs;
