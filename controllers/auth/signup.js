const { httpError } = require('../../helpers');
const { User } = require('../../models/auth');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, 'Email in use');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    subscription,
    password: passwordHash,
  });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

module.exports = signup;
