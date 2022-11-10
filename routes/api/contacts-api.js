const express = require('express');

const router = express.Router();


const { getById, getAll, add, update, remove} = require('../../controllers')
const {controllerWrapper} = require('../../helpers/controllerWrapper')





router.get('/', controllerWrapper(getAll));

router.get('/:id', controllerWrapper(getById));

router.post('/', controllerWrapper(add));

router.put('/:id', controllerWrapper(update))

router.delete('/:id', controllerWrapper(remove));

module.exports = router;
