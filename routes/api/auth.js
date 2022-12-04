const express = require('express');
const { validation } = require('../../middlewars');
const { controllerWrapper } = require('../../middlewars');
const { register } = require('../../controllers/auth');
const {schemas} = require('../../models/auth');

const router = express.Router();

router.post(
  '/register',
  validation(schemas.register),
  controllerWrapper(register)
);
// router.post('/login', validation(loginSchema));

module.exports = router;
