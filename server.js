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

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
       
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });