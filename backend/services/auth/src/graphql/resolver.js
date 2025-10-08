import db from "../config/config.js";

export const resolvers = {
  Query: {
    users: async () => {
      try {
        console.log("Fetching users from database...");
        const result = await db.query("SELECT * FROM users");
        console.log("Database result:", result.rows);
        console.log("Number of users found:", result.rows.length);
        return result.rows;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      try {
        console.log("Creating user with input:", input);
        const { username, email, password, dob, phone, country } = input;
        const result = await db.query(
          `INSERT INTO users (username, email, password, dob, phone_number, country)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     RETURNING *`,
          [username, email, password, dob, phone, country]
        );
        console.log("User created:", result.rows[0]);
        console.log("User creation successful");
        return result.rows[0];
      } catch (error) {
        console.error("Actual error creating user:", error);
        throw new Error("Failed to create user");
      }
    },
  },
};
