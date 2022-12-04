const { Schema, model } = require('mongoose');
const { MongoServerErorr } = require('../helpers');
const Joi = require('joi');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Paswword is required'],
      minLength: 2,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(2).max(24),
});

const login = Joi.object({
  name: Joi.string().required().min(2).max(24),
  email: Joi.string().required().min(2).max(24),
});

const schemas = {
  login,
  register,
};

UserSchema.post('save', MongoServerErorr);

const User = model('user', UserSchema);

module.exports = {
  User,
  schemas,
};
