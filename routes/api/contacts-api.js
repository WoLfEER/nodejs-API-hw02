const express = require('express');
const { schema, favoriteSchema } = require('../../models/contact');
const {
  controllerWrapper,
  validation,
  isValidId,
  authentication,
} = require('../../middlewars');

const router = express.Router();

const {
  getById,
  getAll,
  add,
  removeById,
  updateById,
  updateFavorite,
} = require('../../controllers');

const validationMiddleware = validation(schema);
const validateFavoriteMiddleWare = validation(favoriteSchema);

router.get('/',authentication, controllerWrapper(getAll));

router.get('/:id', authentication, isValidId, controllerWrapper(getById));

router.post('/', authentication, validationMiddleware, controllerWrapper(add));

router.put(
  '/:id',
  isValidId,
  authentication,
  validationMiddleware,
  controllerWrapper(updateById)
);
router.patch(
  '/:id/favorite',
  isValidId,
  authentication,
  validateFavoriteMiddleWare,
  controllerWrapper(updateFavorite)
);

router.delete('/:id', authentication, isValidId, controllerWrapper(removeById));

module.exports = router;
