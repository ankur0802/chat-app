const Errorhandler = require('../utils/errorhandler')

module.exports = (err, req, res, next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server Error";

    // Wrong mongodb id error
    if(err.name === 'CastError'){
        const message = `Resources not found. Invalid: ${err.path}`
        err = new Errorhandler(message, 400)
    }

    // mongoose duplicate key error 
    if(err.code=== 11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new Errorhandler(message, 400)
    }

    // Wrong Jwt Error 
    if(err.name === 'JsonWebTokenError'){
        const message = `json web token is Invalid. try again`
        err = new Errorhandler(message, 400)
    }

    // JWT expire Error 
    if(err.name === 'TokenExpiredError'){
        const message = `json web token is expired . try again`
    }

    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })



}