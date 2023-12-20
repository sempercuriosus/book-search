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
    // console.log(req.headers);
    let token = req.headers.authorization;

    const spaceIndex = token.indexOf(' ');

    token = token.substring(spaceIndex).trim();

    console.log(token);

    if (!token) {
      return 'Token Not Set';
    }

    try {
      // ASSIGNING THE REQUEST USER CONTEXT FOR SERVER USE
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid Operation...');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

