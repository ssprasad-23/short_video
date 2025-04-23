import express from 'express';
import dotenv from 'dotenv';


// Initialize Express
const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});