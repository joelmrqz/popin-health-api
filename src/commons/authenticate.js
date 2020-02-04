const User = require('../models/User');

const authenticate = {
  userProfile: async (pathParameters) => {
    if (!pathParameters  || !pathParameters.userProfile) {
      return false;
    }

    const user = await User.findByPk(pathParameters.userProfile);

    if (!user) {
      return false;
    }

    return user;
  },
};

module.exports = authenticate;
