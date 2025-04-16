import sql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//connect to the database
db.connect((err) => {
    if (err){
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database.");
});

export default db;