//controllers are the user actions, events that occur within the app. This is authentication events controller to handle New User Registration and Existing User Login

//import the user to be authenticated
const User = require('../models/User')

//importing installed status codes
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


//new user registration event
const register = async (req,res) => {    
    const user = await User.create({...req.body})//'{...req.body}' enables mongoose to do the user validation
    
    //creating jwt
    const token = user.createJWT()
    
    //output response
    res
    .status(StatusCodes.CREATED)
    .json({user:{name:user.name}, token})
}

//user login event
const login = async (req,res) => {
    //checking for email and password input
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }
    //Checking User Credentials during login
    //checking if email exists
    const user = await User.findOne({email})    
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    //comparing password for existing email to see if match
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    //All correct ... user exist and password match
    const token = user.createJWT()
    res
    .status(StatusCodes.OK)
    .json({user:{name:user.name},token})
}

module.exports = {
    register,
    login,
}