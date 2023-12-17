const { User, Book } = require('../models');

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
        login: async () => {
            return 'login';
        },
        addUser: async () => {
            return 'create_us';
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
