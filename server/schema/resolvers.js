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
        me: async () => {
            return User.find({});
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
        login: async () => {
            return 'login';
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
