import express, { Request, Response } from "express";
import path from "node:path";
import db from "./config/connection.js";
import routes from "./routes/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authenticateToken } from "./utils/auth.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  // xTodo: figure out what the database is called and where it is
  // It's in ./config/connection.ts
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // ? is this neccessary?
  // app.use(routes);

  // ! replacing with this from the class repo for now
  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  app.use(express.static(path.join(process.cwd(), "../client/dist")));

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

startApolloServer();