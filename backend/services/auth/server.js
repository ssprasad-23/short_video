import db from "../auth/src/config/config.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../auth/src/graphql/schema.js";
import { resolvers } from "../auth/src/graphql/resolver.js";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleweare
app.use(express.json());
dotenv.config();

// Connect to DB and start express & graphql server
db.connect()
  .then(async () => {
    console.log("Connected to PostgreSQL");

    // Check if table exists first
    const tableExists = await db.query(`
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'users'
        );
    `);

    // Only create table if don't exist
    if (!tableExists.rows[0].exists) {
      const sqlFile = path.join(__dirname, "src/db/userTable.sql");
      const createTableSQL = fs.readFileSync(sqlFile, "utf8");
      await db.query(createTableSQL);
      console.log("Table and trigger created successfully");
    } else {
      console.log("Table already exists, skipping creation");
    }
    // Define GraphQL schema and resolvers
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    //start apolo server
    await server.start();

    // Apply middleware
    app.use("/graphql", expressMiddleware(server));

    // Start server after DB and graphQL
    app.listen(PORT, () => {
      console.log(`Express server running at http://localhost:${PORT}/`);
      console.log(`GraphQL endpoint at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error("Error:", err.stack);
    process.exit(1);
  });
