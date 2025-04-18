import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'; 
import { typeDefs } from "./src/graphql/schemas.js";
import { resolvers } from "./src/graphql/resolvers.js";
import dotenv from "dotenv";
// import db from "./src/config/dbConfig.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

//Create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Start apollo server
async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
