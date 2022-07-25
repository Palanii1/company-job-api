const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

//Badrequest Error is for wrong login details (wrong request)
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
