// Importing the apollo client
import { gql } from '@apollo/client';

// EXPORT QUERY
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

