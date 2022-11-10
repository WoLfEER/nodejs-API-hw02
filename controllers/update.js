const contactsOperation = require('../models/contacts');
const httpError = require('../helpers/httpError');
// const {NotFoundError} = require('http-errors')
// console.log(NotFoundError);

const update = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await contactsOperation.updateById(id, req.body);
  if (!updatedContact) {
    throw httpError(404);
  }
  res.json(updatedContact);
};

module.exports = update;
