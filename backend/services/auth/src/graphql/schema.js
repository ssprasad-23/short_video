export const typeDefs = `#graphql
    type User {
        user_id: ID!
        username: String!
        email: String!
        password: String!
        dob: String!
        phone_number: String
        country: String!
        is_verified: Boolean
        created_at: String!
        updated_at: String!
        last_login: String
    }

    type Query {
        users: [User!]!
    }

    input SignUpInput {
        username: String!
        email: String!
        password: String!
        dob: String
        phone_number: String
        country: String!
    }

    type Mutation {
        signUp(input: SignUpInput!): User!
    }
`;
