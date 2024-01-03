// Adding GraphQl
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: ({ req }) => {
    // req has a headers section, which has an authorization to it, using that.
    let token = req.headers.authorization;

    if (!token) {
      return req;
    }

    const spaceIndex = token.indexOf(' ');

    token = token.substring(spaceIndex).trim();

    try {
      // ASSIGNING THE REQUEST USER CONTEXT FOR SERVER USE
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.error('Invalid Operation...');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

