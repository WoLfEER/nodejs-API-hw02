const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = (name === 'MongoServerErorr' && code === 11000) ? 409 : 400;
  next();
};

module.exports = handleSaveError;
