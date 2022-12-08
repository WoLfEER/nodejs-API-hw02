const { Contact } = require('../models/contact');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contactList = await Contact.find(
    favorite ? { favorite, owner } : owner,
    '-createdAt -updatedAt',
    {
      skip,
      limit,
    }
  ).populate('owner', 'name email subscription');
  res.json(contactList);
};

module.exports = getAll;
