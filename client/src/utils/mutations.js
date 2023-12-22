// Importing the apollo client
import { gql } from '@apollo/client';

// EXPORT MUTATIONS

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
      }
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($savedBooks: BookInfo!) {
    saveBook(savedBooks: $savedBooks) {
      username
      bookCount
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation DeleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      bookId
    }
  }
`;

