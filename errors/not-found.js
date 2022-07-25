const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

//not found is for no existing page
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
