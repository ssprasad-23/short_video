import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 5432
});

// Connect to the database
db.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch(err => {
        console.error("Error connecting to PostgreSQL:", err.stack);
    });