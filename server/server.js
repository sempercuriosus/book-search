
/*
  * IMPLEMENTING APOLLO SERVER
  * 
  * server
  * - import apollo server 
  * - setup express middleware
  * 
  * - discontinue routes router
  * 
  * database
  * - import schema
  * - - type defs and resolvers
  * 
  * connection 
  * - add connection information
  * 
  * server
  * - declare the server
  * - express use declaration
  * - setup apollo server and make sure it is asynchronous
  * - - await the server start
  * - - middleware declarations
  * - - - (include graph ql)
  * - - db open, start app listening on PORT
  * 
  * start apollo server
*/
const express = require('express');
const path = require('path');
const db = require('./config/connection');
// discontinued
// const routes = require('./routes');


const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schema');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs
  , resolvers
});

const app = express();

const startApolloServer = async () => {

  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // in updating the code base, this has been discontinued
  // app.use(routes);

  // app will now use graphql as the router
  // setting up an endpoint and passing the server, server, as an argument
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });

};

startApolloServer();