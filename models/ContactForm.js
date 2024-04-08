const mongoose = require('mongoose');
const { Schema } = mongoose

const ContactFormSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    query: {
        type: String,
        require: true
    },
    contactNo: {
        type: String,
        require: true
    },
    status: {
        type: String, 
        require: true,
        enum: ['new', 'pending', 'completed']
    }

}, {timestamps: true});

module.exports = mongoose.model('contactform', ContactFormSchema)