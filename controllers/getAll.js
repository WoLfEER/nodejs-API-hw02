const contactsOperation = require('../models/contacts');

const getAll = async (req, res, next) => {
  const contactList = await contactsOperation.listContacts();
  res.json(contactList);
};

module.exports = getAll;
