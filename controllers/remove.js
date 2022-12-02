const {Contact} = require('../models/contact');
const {httpError} = require('../helpers');

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = Contact.findByIdAndRemove(id);
    if (!deletedContact) {
      throw httpError(404);
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
