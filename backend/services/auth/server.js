import db from '../auth/src/config/config.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db.connect()
    .then(async () => {
        console.log("Connected to PostgreSQL");
        // Read and execute the SQL file
        const sqlFile = path.join(__dirname, 'src/db/userTable.sql');
        const createTableSQL = fs.readFileSync(sqlFile, 'utf8');
        await db.query(createTableSQL);
        console.log("Table creation successful");
    })
    .catch(err => {
        console.error("Error:", err.stack);
    });