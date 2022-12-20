const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const { httpError } = require('../../helpers');
const { User } = require('../../models/auth');

const avatarDir = path.join(process.cwd(), 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const uploadResult = path.join(avatarDir, filename);

  Jimp.read(tempDir, (err, image) => {
    if (err) {
      httpError(400);
    }
    image.resize(250, 250).write(uploadResult);
  });

  fs.unlink(tempDir, function (err) {
    if (err) {
      console.log(err);
    }
  });

  const avatarURL = path.join('avatars', filename);

  const result = await User.findByIdAndUpdate(_id, { avatarURL });
  if (!result) {
    httpError(404);
  }

  res.json({ avatarURL });
};

module.exports = updateAvatar;
