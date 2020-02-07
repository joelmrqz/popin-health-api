const User = require('../models/User');

const authenticate = {
  userProfile: async (pathParameters) => {
    if (!pathParameters  || !pathParameters.userProfile) {
      return false;
    }

    const userProfile = parseInt(pathParameters.userProfile, 10);
    const user = await User.findByPk(userProfile);

    if (!user) {
      return false;
    }

    return user;
  },
};

module.exports = authenticate;
