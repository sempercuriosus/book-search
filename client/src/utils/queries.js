// Importing the apollo client
import { gql } from '@apollo/clinet';

// EXPORT QUERY
export const GET_ME = gql`
  query Me($username: String, $email: String) {
    me(username: $username, email: $email) {
      username
    }
  }
`;

