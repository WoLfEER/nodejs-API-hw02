const contactsOperation = require('../models/contacts');
const httpError = require('../helpers/httpError');
const { schema } = require('../helpers/schema');

const add = async (req, res, next) => {
  const body = req.body;
  const { error } = schema.validate(body);
  if (error) {
    throw httpError(400, error.message);
  }
  const newContact = await contactsOperation.addContact(body);
  res.status(201).json(newContact);
};

module.exports = add;
