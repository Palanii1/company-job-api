//Schema provides a set model template for data. 

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') //password hashing library

const jwt = require('jsonwebtoken')

//Here we are setting a model template for User details
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Provide name'],
        minlength:3,
        maxlength:50,        
    },
    email:{
        type:String,
        required:[true, 'Please Provide email'],
        //regex for email validation
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
        ],
        unique:true,        
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:6,        
    },
})

//model for password hashing for security using mongoose middleware
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


//model for jwt authentication
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

//model to compare hashed password for login
UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)