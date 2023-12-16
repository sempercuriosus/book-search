const { User, Book } = required('../models');

console.info('--- INFORMATION --->', 'resolvers loaded');

const resolvers = {

    // QUERY START
    Query: {
        users_all: async () => {
            return User.find({});
        },
        book_all: async () => {
            return Book.find({});
        }
    },

    // MUTATION START
    Mutation: {

    }

};

module.exports = resolvers;