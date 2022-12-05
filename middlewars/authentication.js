const jwt = require('jsonwebtoken');
const httpErrors = require('../helpers');

const {SECRET_KEY} = process.env

const authentication = (req, res, next) => {

console.log(req);
//   const { authorization } = req.headers;
//   const [bearer, token] = authorization.split(' ');
//   if (!bearer) {
//       next(httpErrors(401))
//   }
//   const result = jwt.verify(token, SECRET_KEY)
//   console.log(result);
};

module.exports = authentication;
