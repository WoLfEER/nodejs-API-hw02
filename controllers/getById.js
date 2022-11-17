const contactsOperation = require('../models/contacts');
const httpError = require('../helpers/httpError');

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contactId = await contactsOperation.getContactById(id);
  if (!contactId) {
    throw httpError(404, 'Not found');
  }
  res.json(contactId);
};

module.exports = getById;
