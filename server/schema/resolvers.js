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
      // console.log('CONTEXT SET IS >', context);
      console.log(context.user);

      try {
        // check the context is set such that the query does not need any params included with it.

        if (context.user == undefined) {
          console.log('User context was not set.');
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

      return { token, userLogin };
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

        return { token, userCreated };
      } catch (error) {
        console.error('-- ERROR ->', error);
        throw Error('There was an error in creating the new user.');
      }
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
    },
    //
    deleteBook: async () => {
      return 'delete_book';
    },
  },
};

console.info('resolvers loaded');

module.exports = resolvers;

