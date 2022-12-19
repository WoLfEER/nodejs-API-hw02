const { httpError } = require('../../helpers');
const { User } = require('../../models/auth');

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    httpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });
  res.json({
    message: 'Verification successful',
  });
};

module.exports = verify;
