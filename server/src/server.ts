import express, { Request, Response } from "express";
import path from "node:path";
import db from "./config/connection.js"; // Ensure this is the correct path
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schema/index.js";
import { authenticateToken } from "./services/auth.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Connect to the database
  const connection = await db();
  if (!connection) {
    console.log("Error connecting to db");
  } else {
    console.log(`Database connected: ${connection.name}`);
  }

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Set up GraphQL middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authenticateToken as any,
    })
  );

  // Serve static files from the React app
  app.use(express.static(path.join(process.cwd(), "../client/dist")));

  // Serve the React app for all other routes
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
  });

  // Start the server once the database connection is open
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`GraphQL API ready at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
