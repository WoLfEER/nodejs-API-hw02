const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const removeById = require('./remove')
const updateById = require('./update')
const updateFavorite = require('./favorite')

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateFavorite,
};
