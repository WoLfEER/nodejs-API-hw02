const contactsOperation = require('../models/contacts');

const add = async (req, res, next) => {
  const newContact = await contactsOperation.addContact(req.body);
  res.status(201).json(newContact);
};

module.exports = add;
