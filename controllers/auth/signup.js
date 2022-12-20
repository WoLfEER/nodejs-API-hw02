const { httpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/auth');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

const { BASE_URL } = process.env;

const signup = async (req, res, next) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, 'Email in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = await User.create({
    email,
    subscription,
    password: passwordHash,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Verify your email please',
    html: `<a href ='${BASE_URL}/api/auth/verify/${verificationToken}'>Click here to verify your email</a>`,
  };

  await sendEmail(mail);

  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

module.exports = signup;
