const { httpError } = require('../../helpers');
const { User } = require('../../models/auth');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, 'This is email already exist');
  }
  const passwordHash = await bcrypt.hash(password, 10)
//   const passwordCompare = await bcrypt.compare(passwordHash, password)
//   console.log(passwordCompare);
  const userData = await User.create({
    email,
    name,
    password : passwordHash
  });
  res.json(userData);   
};

module.exports = register;
