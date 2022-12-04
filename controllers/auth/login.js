const { httpError } = require('../../helpers');
const { User } = require('../../models/auth');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = User.find({email})
  if(!user) {
      throw httpError(401, 'Email or login not valid')
  }
  const passwordHash = bcrypt.hash(password, 10)
  const passwordCompare = bcrypt(password, passwordHash)
  
};
