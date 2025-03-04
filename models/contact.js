const { Schema, model } = require('mongoose');
const { MongoServerError } = require('../helpers');
const Joi = require('joi');

const nameRegexp = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/;
const emailRegexp = /^.+@.+$/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      match: nameRegexp,
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 50,
      trim: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      trim: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  favorite: Joi.boolean().required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post('save', MongoServerError);

const Contact = model('contact', contactSchema);

module.exports = { Contact, schema, favoriteSchema };
