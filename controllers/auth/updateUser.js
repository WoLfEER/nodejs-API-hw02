const { User } = require('../../models/auth');
const httpError = require('../../helpers');

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw httpError(404, 'User not found');
  }
  res.json(result);
};

module.exports = updateUser;
