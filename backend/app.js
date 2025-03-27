import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'; 
import { typeDefs } from "./src/graphql/schemas.js";
import { resolvers } from "./src/graphql/resolvers.js";
import sql from "mysql2";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

//Create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Create mysql connection
const db = sql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database.");
});

//Start apollo server
async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
  });
}
startServer();
