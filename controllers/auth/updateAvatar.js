const fs = require('fs').promises;
const path = require('path');
const { User } = require('../../models/auth');
const Jimp = require('jimp');
const { httpError } = require('../../helpers');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  if (!req.file) {
    return res.json({ message: 'Only .png, .jpg and .jpeg format available!' });
  }

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  try {
    Jimp.read(tempDir, (error, image) => {
      if (error) httpError(400);
      image.resize(250, 250).write(resultUpload);
    });
  } catch (error) {
    return next(httpError(400, 'oops!'));
  }

  await fs.unlink(tempDir);

  await fs.rename(tempDir, resultUpload);
  const avatarUrl = path.join('avatars', filename);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
