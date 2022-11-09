const express = require('express');

const router = express.Router();
const Joi = require('joi');

const contactsOperation = require('../../models/contacts');
const httpError = require('../../helpers/httpError');

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contactList = await contactsOperation.listContacts();
    res.json(contactList);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactId = await contactsOperation.getContactById(id);
    if (!contactId) {
      throw httpError(404, 'Not found');
    }
    res.json(contactId);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      throw httpError(400, error.message);
    }
    const newContact = await contactsOperation.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedContact = await contactsOperation.updateById(id, body);
    if (!updatedContact) {
      throw httpError(404);
    }
    res.json(updatedContact);
    const { error } = schema.validate(body);
    if (error) {
      throw httpError(400, error.message);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
try {
  const { id } = req.params;
  const deletedContact = contactsOperation.removeContact(id)
  if (!deletedContact) {
    throw httpError(404)
  }
  req.status(204);
} catch (error) {
  next(error)
}
});

module.exports = router;
