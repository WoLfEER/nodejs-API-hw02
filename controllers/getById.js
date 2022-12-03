const {Contact} = require('../models/contact');
const {httpError} = require('../helpers')

const getById = async (req, res) => {
  const { id } = req.params;
  const contactId = await Contact.findById(id, '-createdAt -updatedAt');
  if (!contactId) {
    throw httpError(404, 'Not found');
  }
  res.json(contactId);
};

module.exports = getById;
