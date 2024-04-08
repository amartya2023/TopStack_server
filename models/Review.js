const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    feedback: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    agentID: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('review', ReviewSchema)