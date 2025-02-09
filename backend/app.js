import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'; 
import { typeDefs } from "./src/graphql/schemas.js";
import { resolvers } from "./src/graphql/resolvers.js";

const app = express();
const PORT = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
  });
}
startServer();
