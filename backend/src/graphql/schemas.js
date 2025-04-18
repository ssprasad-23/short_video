export const typeDefs = `#graphql
    type User {
        id: ID!
        userName: String!
        firstName: String
        lastName: String
        gender: String
        dob: String
        phone: String
        city: String!
        country: String!
        email: String!
        password: String!
        createdAt: String!
        updatedAt:String
        profileImage: String
    },
    type Video {
        id: ID!
        creator: User!
        language: String!
        caption: String
        videoUrl: String!
        duration: Int!
        likes: Int!
        shares: Int!
        views: Int!
        createdAt: String!
        updatedAt: String
    },
    type Query {
        getUser: [User!]!
        getVideo: [Video]
    }
`