const { httpError, sendEmail, createVerifyEmail } = require('../../helpers');
const { User } = require('../../models/auth');

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    httpError(404, 'User not found');
  }

  if (user.verify) {
    httpError(400, 'Verification has already been passed');
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerify;
