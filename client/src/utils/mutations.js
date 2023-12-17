// Importing the apollo client
import { gql } from '@apollo/client';

// EXPORT MUTATIONS

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

export const LOGIN_USER = gql`
  mutation Login($password: String!, $username: String) {
    login(password: $password, username: $username) {
      token
      user {
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($book: BookSave!) {
    saveBook(book: $book) {
      username
      bookCount
    }
  }
`;

export const REMOVE_BOOK = gql``;

