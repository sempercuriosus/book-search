
/* 
 * TYPE DEFINITIONS (Schema)
 * ---
 * Define the structure and capabilities of your GraphQL API.
 * types are objects, object type specifically
 * they are more flexible and are have no direct link to a table
 * --- They are a BLUEPRINT ---
 * they are a middleman between client and server SPECIFICALLY for the structure and interactions for the data
 * 
 * typeDefs specify the types available
 * - their relationships between types
 * - queries
 * - mutations
 * 
 * Think of typeDefs as a blueprint for your GraphQL API, providing a clear contract between the client and server regarding the expected structure of data.
 * MUTATIONS
 * ---
 * Define interations one may take with the data
 * follow CRUD
 * not only DATABASE actions but also SERVER actions
*/

console.info('--- INFORMATION --->', 'type defs loaded');

/*
  * type
  * ---
  * 
  * - User
  * - Book
  * - Auth
  * 
  * mutations
  * ---
  *
  * - me -> return User type
  * - login -> params email and password
  * - add user -> params username, email, and password 
  * - save book -> params authors [array], description, bookId, image, and link -> return User type
  * - - convert this to input 
  * 
*/

const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]

}


type Book {
    bookId: String!
    author: [String!]
    description: String!
    title: String!
    image: String
    link: String
}


type Auth{
    token: String
    user: User
}


type Query {
    me: User
}


type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
} 


type Mutation {
    login: Auth
}


type Mutation {
    saveBook: User
}


type Mutation {
    deleteBook: User
}


`;


console.info('--- INFORMATION --->', 'type defs done');


module.exports = typeDefs;