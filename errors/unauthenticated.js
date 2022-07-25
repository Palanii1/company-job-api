const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

//Unauthenticated error is for user does not exist. No access
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
