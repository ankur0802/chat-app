const mongoose = require('mongoose')

const connectDB = async()=>{

    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(`mongodb connected: ${conn.connection.host}`);

}

module.exports = connectDB;