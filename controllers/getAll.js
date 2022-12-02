const { Contact } = require('../models/contact');

const getAll = async (req, res, next) => {
  const contactList = await Contact.find({}, '-createdAt -updatedAt');
  res.json(contactList);
};

module.exports = getAll;
