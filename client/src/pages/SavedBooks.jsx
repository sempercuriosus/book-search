import Auth from '../utils/auth';

import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';

import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';
import { Fragment } from 'react';

const SavedBooks = () => {
  // use query has 'loading' as a flag to indicate if the process is done
  const { data, loading, error, refetch } = useQuery(GET_ME);
  const [deleteBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  if (error) {
    console.info('User Data is not set or is null');
    console.error('ERROR FOUND', error);

    return (
      <Fragment>
        <h1>User Query Error</h1>
        <p>There was an issue querying for the data. </p>
      </Fragment>
    );
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteBook({
        variables: { bookId },
      });

      if (data.error) {
        throw new Error('something went wrong!');
      }

      // upon success, remove book's id from localStorage
      removeBookId(bookId);

      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div
        // This is causing an issue in the browser.
        // Normally, I would not change this, but I am commenting it out
        // fluid
        className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing {userData.username}&#39;s Books</h1>
          <h3></h3>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Col md='4'>
                <Card
                  key={book.bookId}
                  border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

