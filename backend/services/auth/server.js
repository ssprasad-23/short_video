import express from "express";
import dotenv from "dotenv";
import db from "./src/config/config.js";
import initDb from "./src/db/init.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, dob, phone, country } = req.body;
    console.log("Creating user with input:", req.body);
    
    const result = await db.query(
      `INSERT INTO users (username, email, password, dob, phone_number, country)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [username, email, password, dob, phone, country]
    );
    
    console.log("User created:", result.rows[0]);
    res.status(201).send({
      message: "Signup successful",
      user: {
        id: result.rows[0].id,
        username: result.rows[0].username,
        email: result.rows[0].email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle duplicate email/username errors
    if (error.code === '23505') {
      return res.status(409).send({
        message: "User already exists",
        error: "Email or username already taken"
      });
    }
    
    res.status(500).send({
      message: "Signup failed",
      error: error.message
    });
  }
});

app.get('/login', (req, res) => {
  try {
    const {email, password} = req.body;
    console.log(`Email: ${email}, Password: ${password}`);
    res.status(200).send({message: "Login successful" });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({message: "Login failed", error: error.message});
  }
});

// startup sequence
(async () => {
  try {
    // Verify DB connectivity
    await db.query("SELECT 1");
    console.log("Database connected successfully");

    // Create tables if needed
    await initDb();

    // Start server AFTER DB is ready
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();