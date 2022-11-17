const contactsOperation = require('../models/contacts')
const httpError = require('../helpers/httpError');

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = contactsOperation.removeContact(id);
    if (!deletedContact) {
      throw httpError(404);
    }
    res.status(200).json( 
      {"message": "contact deleted"});
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
