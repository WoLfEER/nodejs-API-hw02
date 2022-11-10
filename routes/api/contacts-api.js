const express = require('express');
const { schema } = require('..//..//helpers/schema');
const { controllerWrapper, validation } = require('../../middlewars');

const router = express.Router();

const {
  getById,
  getAll,
  add,
  removeById,
  updateById,
} = require('../../controllers');

const validationMiddleware = validation(schema);

router.get('/', controllerWrapper(getAll));

router.get('/:id', controllerWrapper(getById));

router.post('/', validationMiddleware, controllerWrapper(add));

router.put('/:id', validationMiddleware, controllerWrapper(updateById));

router.delete('/:id', controllerWrapper(removeById));

module.exports = router;
