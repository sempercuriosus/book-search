const { JsonWebTokenError } = require('jsonwebtoken');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

console.info('--- INFORMATION --->', 'resolvers loaded');

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
        me: async (parent, { username, email }) => {

            console.log('username', username, 'email', email);

            try {

                if (!username && !email) {
                    throw Error('Cannot Create Serarch. No Values Passed In');
                }

                // Search by USERNAME, default
                let query = { username: username };

                // Search by EMAIL
                if (!username) {
                    query = { email: email };
                }

                const user = await User.findOne(query);

                if (!user) {
                    throw Error('Error When Locating User');
                }

                console.log(user);

                // console.log(user, user.email, user.username);

                return user;
            }
            catch (error) {
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
        addUser: async (parent, { username, email, password }, context) => {
            try {
                const userCreated = await User.create({ username, email, password });

                const token = signToken(userCreated);

                console.log(userCreated);

                return { token, userCreated };
            }
            catch (error) {
                console.error('-- ERROR ->', error);
            }
        },
        login: async ({ username, email }) => {

            const userLogin = await User.findOne({ $or: [ { "username": username }, { "email": email } ] });

            if (!userLogin) {
                throw new Error('Error');
            }

            const userPassword = await userLogin(password);

            if (!userPassword) {
                throw new Error('Error');
            }

        },
        saveBook: async () => {
            return 'save_book';
        },
        deleteBook: async () => {
            return 'delete_book';
        },
    }

};

console.info('--- INFORMATION --->', 'resolvers done');

module.exports = resolvers;
