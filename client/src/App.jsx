import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';

// Importing the ApolloClient to handle routing
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

// create uri to add to the link in the Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// adding the token to include in the requests. id_token set in auth.js
// _ is skipping the parent
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer' + ' ' + token : '',
    },
  };
});

const client = new ApolloClient({
  // this is matches the server.js declaration of middleware
  // setting the uri here instead of importing another module
  link: authLink.concat(httpLink),
  // make sure that new is called here. you are instantiating a new instance of a cache not just using the method.
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;

