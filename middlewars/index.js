const validation = require('./validation');
const controllerWrapper = require('./controllerWrapper');
const isValidId = require('./isValidId');
const authentication = require('./authentication');
const upload = require('./upload');

module.exports = {
  validation,
  controllerWrapper,
  isValidId,
  authentication,
  upload,
};
