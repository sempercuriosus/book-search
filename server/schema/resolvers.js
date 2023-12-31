const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  // USER-CONTROLLER FUNCTIONS NEEDED OVER
  /*
   * get single user
   * create user
   * login
   * save book
   * delete book
   */

  // QUERY START

  Query: {
    me: async (parent, args, context) => {
      try {
        // check the context is set such that the query does not need any params included with it.

        if (context.user == undefined) {
          console.error('User context was not set.');
          return {};
        }

        const userId = context.user ? context.user._id : '';

        if (userId) {
          // Search by ID, default

          let query = { _id: userId };

          const user = await User.findOne(query);

          if (!user) {
            throw new Error('Error When Locating User');
          }

          return user;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  // MUTATION START

  Mutation: {
    login: async (parent, { email, password }) => {
      const userLogin = await User.findOne({ email: email });

      if (!userLogin) {
        throw new Error('Error Loggin In.');
      }

      // isCorrectPassword is a user-defined method made in the model for this process
      const userPassword = await userLogin.isCorrectPassword(password.trim());

      if (!userPassword) {
        throw Error('Error Logging In.');
      }

      // created token
      const token = signToken(userLogin);

      return { token: token, user: userLogin };
    },
    //
    addUser: async (parent, { username, email, password }, context) => {
      try {
        // usernames and passwords are case-INsensitive
        const userCreated = await User.create({
          username: username,
          email: email,
          password,
        });

        const token = signToken(userCreated);

        return { token: token, user: userCreated };
      } catch (error) {
        console.error('-- ERROR ->', error);
        throw Error('There was an error in creating the new user.');
      }
    },

    // Save book required all of title, author, and description
    saveBook: async (parent, { savedBooks }, context) => {
      // Is the user logged in? If not, cannot save.

      if (!context.user) {
        throw new Error('Cannot Save Book. User Not Logged In.');
      }

      if (
        !savedBooks.title ||
        !savedBooks.authors.length ||
        !savedBooks.description
      ) {
        throw new Error('Cannot Save Book. No Values Past.');
      }

      try {
        const updatedUserList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: savedBooks } },
          // new dictates that we are getting the MOST RECENT result-set, otherwise this would lag by one update each time.
          { new: true, runValidators: true },
        );

        return updatedUserList;
      } catch (error) {
        console.error(error);

        throw Error('ERROR SAVING THE BOOK');
      }
    },
    //
    deleteBook: async (parent, { bookId }, context) => {
      console.info('delete_book : ' + bookId);

      try {
        const bookToRemove = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true, runValidators: true },
        );

        console.log(bookId, 'book has been removed.');
      } catch (error) {
        console.error(error);
      }
    },
  },
};

console.info('resolvers loaded');

module.exports = resolvers;

