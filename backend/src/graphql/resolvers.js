import db from "../config/dbConfig.js";

export const resolvers = {
    Query: {
        getUser: async () => {
            try {
                const [users] = await db.query("SELECT * FROM users");
                return users;
            } catch (error) {
                console.error("Error fetching users:", error.message, error.stack);
                throw new Error("Failed to fetch users");
            }
        },

        getVideo: () => {
            return ("dummy video info")
        }
    }
}