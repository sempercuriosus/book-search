const { User, Book } = require('../models');

console.info('--- INFORMATION --->', 'resolvers loaded');

const resolvers = {


    // QUERY START
    Query: {
        users_all: async () => {
            return User.find({});
        },
        //     book_all: async () => {
        //         return Book.find({});
        //     }
    },

    // MUTATION START
    // Mutation: {

    // }

};

console.info('--- INFORMATION --->', 'resolvers done');

module.exports = resolvers;
