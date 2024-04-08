const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('service', ServiceSchema)