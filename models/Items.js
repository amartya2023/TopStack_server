const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imgUrl: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('item', ItemSchema)