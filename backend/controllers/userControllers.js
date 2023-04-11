const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Errorhandler = require('../utils/errorhandler')
const sendToken = require('../utils/jwtToken')
const User = require('../models/userModel')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

// register user 

exports.registerUser = catchAsyncErrors(async(req, res, next)=>{
                   

    const {name, email, password, pic} = req.body;
   

    const user = await User.create({
        name, 
        email, 
        password, 
        pic
    })

    

    sendToken(user, 201, res)

})

// login user 
exports.loginUser = catchAsyncErrors(async(req, res, next)=>{

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return next(new Errorhandler('Please Enter Your Email And Password', 400))
    }

    const user = await User.findOne({email: email})

    if(!user){
        return next(new Errorhandler('Invalid Email or Password', 401))
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return next(new Errorhandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)

})

// logout user 
exports.logout = catchAsyncErrors( async(req, res, next)=>{
    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message:"Logged out"
    })

})