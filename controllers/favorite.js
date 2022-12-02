const {Contact} = require('../models/contact');
const {httpError} = require('../helpers');

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new : true})
  if (!updatedContact) {
    throw httpError(404);
  }
  res.json(updatedContact);
};

module.exports = updateFavorite; 
