const { Schema, model } = require('mongoose');
const { MongoServerErorr } = require('../helpers');
const Joi = require('joi');

const UserSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const signup = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(2).max(24),
  subscription: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string().required().min(2).max(24),
  password: Joi.string().required().min(2).max(24),
});

const schemas = {   
  login,
  signup,
};

UserSchema.post('save', MongoServerErorr);

const User = model('user', UserSchema);

module.exports = {
  User,
  schemas,
};
