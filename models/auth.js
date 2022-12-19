const { Schema, model } = require('mongoose');
const { MongoServerError } = require('../helpers');
const Joi = require('joi');

const passwordRegexp = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const UserSchema = Schema(
  {
    password: {
      type: String,
      minlength: 8,
      required: [
        true,
        'A password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces',
      ],
      match: passwordRegexp,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    avatarURL: {
      type:String
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  


  { versionKey: false, timestamps: true }
);

const signup = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(2).pattern(passwordRegexp),
  subscription: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string().required().min(8).pattern(emailRegexp),
  password: Joi.string().required().min(8).pattern(passwordRegexp),
});

const updateSubscription = Joi.object({
  subscription: Joi.required().valid('[starter', 'pro', 'business'),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
});

const schemas = {
  login,
  signup,
  updateSubscription,
  verifyEmailSchema
};

UserSchema.post('save', MongoServerError);

const User = model('user', UserSchema);

module.exports = {
  User,
  schemas,
};
