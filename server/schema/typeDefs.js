
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


const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
}

type Query {
    users_all: [User]
}


`;

// type Book {
//     _id: ID!
//     author: String!
//     title: String!
//     link: String
// }

// mutation BookCount{

// }

console.info('--- INFORMATION --->', 'type defs done');


module.exports = typeDefs;