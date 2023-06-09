const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')


const errorMiddleware = require('./backend/middleware/error')
const notfounderr = require('./backend/middleware/notfounderr');


// config
dotenv.config({path: 'backend/config/config.env'})


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
app.use(fileUpload())


// routes import 
const userRoutes = require('./backend/routes/userRoutes');
const chatRoutes = require('./backend/routes/chatRoutes');
const messageRoutes = require('./backend/routes/messageRoutes');


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/messages', messageRoutes)


// middleware for Error 
app.use(notfounderr)
app.use(errorMiddleware)


module.exports = app;