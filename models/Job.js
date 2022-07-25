//Schema model that provides a template for the different jobs that will be posted on the website

const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Please provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, 'Please provide positon'],
        maxlength:100
    },
    status:{
        type:String,
        enum: ['interview', 'declined', 'pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},{timestamps:true})


module.exports = mongoose.model('Job', JobSchema)