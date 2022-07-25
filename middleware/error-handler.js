// Errors that expected to come up
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    // setting default error message
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, msg:err.message || 'Something went wrong try again later'
  }

  //handling validation error, wrong email or password
  if (err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode = 400
  }
  //handling duplicate error, already existing email account
  if (err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }
  //handling cast error, wrong id errors
  if (err.name === 'CastError'){
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
