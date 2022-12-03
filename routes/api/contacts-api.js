const express = require('express');
const {schema, favoriteSchema} = require('../../models/contact')
const { controllerWrapper, validation, isValidId} = require('../../middlewars');
require('dotenv').config();

const router = express.Router();

const {
  getById,
  getAll,
  add,
  removeById,
  updateById,
  updateFavorite
} = require('../../controllers');

const validationMiddleware = validation(schema);
const validateFavoriteMiddleWare = validation(favoriteSchema)

router.get('/', controllerWrapper(getAll));

router.get('/:id', isValidId, controllerWrapper(getById));

router.post('/', validationMiddleware, controllerWrapper(add));

router.put('/:id',isValidId, validationMiddleware, controllerWrapper(updateById));
router.patch('/:id/favorite',isValidId, validateFavoriteMiddleWare, controllerWrapper(updateFavorite));

router.delete('/:id',isValidId, controllerWrapper(removeById));

module.exports = router;
