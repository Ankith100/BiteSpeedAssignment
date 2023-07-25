const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    id: {
        type:Number,
        required: true,
    },
    PhoneNumber: String,
    email: String,
    linkedId:  {
        type:Number,
        required: true,
    },
    linkPrecedence: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },            
    updatedAt:{
        type: Date,
        default: Date.now,
    },  
    deletedAt:{
        type: Date
    }   
})

module.exports = contactSchema;