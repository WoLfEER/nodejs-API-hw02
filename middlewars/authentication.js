const jwt = require('jsonwebtoken');
const { httpError } = require('../helpers');
const { SECRET_KEY } = process.env;
const { User } = require('../models/auth');

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(httpError(401, 'Not authorized'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(httpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
