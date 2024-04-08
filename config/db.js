const mongoose = require('mongoose');

const connectToDB = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        
    } catch (error) {
        console.error(`Error in DB : ${error.message}`);
    }
}

module.exports = connectToDB;