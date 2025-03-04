const express = require('express');
const { validation, authentication, upload } = require('../../middlewars');
const { controllerWrapper } = require('../../middlewars');
const {
  signup,
  login,
  current,
  logout,
  updateUser,
  updateAvatar,
  verify,
  resendVerify
} = require('../../controllers/auth');
const { schemas } = require('../../models/auth');

const router = express.Router();

router.post('/signup', validation(schemas.signup), controllerWrapper(signup));
router.post('/signin', validation(schemas.login), controllerWrapper(login));

router.get('/users/verify/:verificationToken', controllerWrapper(verify));
router.post(
  "/verify",
  validation(schemas.verifyEmailSchema),
  controllerWrapper(resendVerify)
);


router.get('/current', authentication, controllerWrapper(current));
router.get('/logout', authentication, controllerWrapper(logout));

router.patch(
  '/users',
  authentication,
  validation(schemas.updateSubscription),
  controllerWrapper(updateUser)
);

router.patch(
  '/users/avatars',
  authentication,
  upload.single('avatar'),
  controllerWrapper(updateAvatar)
);

module.exports = router;
