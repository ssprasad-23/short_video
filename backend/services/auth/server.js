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
    const {username, email, password, dob, country} = req.body;
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}, DOB: ${dob}, Country: ${country}`);
    res.status(200).send({message: "Signup successful" });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({message: "Signup failed", error: error.message});
  }
});

app.post('/login', (req, res) => {
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