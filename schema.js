export default `

type Subscription {
    userAdded: User!
}

type Suggestion {
    id: Int!
    text: String!
    creatorId: Int!
    creatorUsername: String
}

type Board {
    id: Int!
    name: String!
    suggestions: [Suggestion!]!
    owner: Int!
}

type User {
    id: Int!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    boards: [Board!]!
    suggestions: [Suggestion!]!
}

type Query {
    allUsers: [User!]!
    getUser(username: String!): User
    userBoards(owner: String!): [Board!]!
    userSuggestions(creatorId: String!): [Suggestion!]!
}

type Mutation {
    updateUser(username: String!, newUserName: String!): [Int!]!
    deleteUser(username: String!): Int!
    createBoard(owner: Int!, name: String!): Board!
    createSuggestion(creatorId: Int!, text: String!, boardId: Int!): Suggestion!
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    createUser(username: String!): User!
}

schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
`;