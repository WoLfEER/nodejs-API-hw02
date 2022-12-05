const express = require('express');
const { validation} = require('../../middlewars');
const { controllerWrapper } = require('../../middlewars');
const { signup, login } = require('../../controllers/auth');
const { schemas } = require('../../models/auth');


const router = express.Router();

router.post(
  '/signup',
  validation(schemas.signup),
  controllerWrapper(signup)
);
router.post('/login', validation(schemas.login), controllerWrapper(login));

module.exports = router;
