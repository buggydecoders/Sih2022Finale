const AppError = require("../utils/appError");
const User = require('../models/User')
// apply restricting to specific members
module.exports = (...role) => {
  //  roles is an array like ['admin','lead-guide'] using res-parameter syntax
  return async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!role.includes(user.role)) {
      return next(
        new AppError(' you do not have permission to perform this action', 401)
      );
    }
    next();
  };
};
