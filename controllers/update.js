const contactsOperation = require('../models/contacts');
const httpError = require('../helpers/httpError');
const { schema } = require('../helpers/schema');

const update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updatedContact = await contactsOperation.updateById(id, body);
  if (!updatedContact) {
    throw httpError(404);
  }
  res.json(updatedContact);
  const { error } = schema.validate(body);
  if (error) {
    throw httpError(400, error.message);
  }
};

module.exports = update;
