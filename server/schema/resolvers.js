const { JsonWebTokenError } = require('jsonwebtoken');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // USER-CONTROLLER FUNCTIONS NEEDED OVER
  /*
   * get single user
   * create user
   * login
   * save book
   * delete book
   */

  // TEST GUY
  // {
  //   "username": "testUser",
  //   "email": "u@t.com",
  //   "password": "test1"
  // }

  // QUERY START

  Query: {
    // only need the username OR email to search by. the default is the username, but if that is not found email is used.
    me: async (parent, { username, email }) => {
      console.log('username', username, 'email', email);

      try {
        if (!username && !email) {
          throw Error('Cannot Create Serarch. No Values Passed In');
        }

        // Search by USERNAME, default
        // the search is case-INsensitive
        let query = { username: new RegExp(username, 'i') };

        // Search by EMAIL
        if (!username) {
          query = { email: new RegExp(email, 'i') };
        }

        console.log(query);

        const user = await User.findOne(query);

        if (!user) {
          throw Error('Error When Locating User');
        }

        console.log(user);

        // console.log(user, user.email, user.username);

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    //     book_all: async () => {
    //         return Book.find({});
    //     }
  },

  // MUTATION START

  Mutation: {
    //
    addUser: async (parent, { username, email, password }, context) => {
      try {
        // usernames and passwords are case-INsensitive
        const userCreated = await User.create({
          username: new RegExp(username, 'i'),
          email: new RegExp(email, 'i'),
          password,
        });

        const token = signToken(userCreated);

        console.log(userCreated);

        return { token, userCreated };
      } catch (error) {
        console.error('-- ERROR ->', error);
        throw Error('There was an error in creating the new user.');
      }
    },
    // login is case-INsensitive
    login: async (parent, { username, email, password }) => {
      const userLogin = await User.findOne({
        $or: [{ username: new RegExp(username, 'i') }, { email: email }],
      });

      if (!userLogin) {
        throw new Error('Error Loggin In.');
      }

      // isCorrectPassword is a user-defined method made in the model for this process
      const userPassword = await userLogin.isCorrectPassword(password);

      if (!userPassword) {
        throw Error('Error Logging In.');
      }

      if (!userPassword) {
        throw new Error('Error');
      }

      // created token
      const token = signToken(userLogin);

      return { token, userLogin };
    },
    // Save book required all of title, author, and description
    saveBook: async (parent, { book }, context) => {
      // Is the user logged in? If not, cannot save.
      if (!context.user) {
        throw new Error('Cannot Save Book. User Not Logged In.');
      }

      if (!book.title || !book.authors || !book.description) {
        throw new Error('Cannot Save Book. No Values Past.');
      }

      const bookSaved = {
        book,
      };

      try {
        const updatedUserList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookSaved } },
          // new dictates that we are getting the MOST RECENT result-set, otherwise this would lag by one update each time.
          { new: true, runValidators: true },
        );

        return updatedUserList;
      } catch (error) {
        console.error(error);
        throw Error('ERROR SAVING THE BOOK');
      }
      return bookSaved;
    },
    //
    deleteBook: async () => {
      return 'delete_book';
    },
  },
};

console.info('resolvers loaded');

module.exports = resolvers;

