const app = require('./app')
const cloudinary = require('cloudinary')

const dotenv = require('dotenv');
const connectDB = require('./backend/database/DBconnect');


// handeling Uncaught exceptions
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
})



// config 
dotenv.config({path: 'backend/config/config.env'})

// connecting database 
connectDB();



const server = app.listen(process.env.PORT, ()=>{
    console.log(`server listening at port ${process.env.PORT}`);
})


// Unhandled promis Rejection 
process.on('unhandledRejection', (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promis Rejection`);

    server.close(()=>{
        process.exit(1)
    })
})