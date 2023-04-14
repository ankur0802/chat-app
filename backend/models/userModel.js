const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        default:'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
    }
},
{
    timestamps:true,
}
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

})

// JWT Token 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXP,
    });
}

// compare password 
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)

}



const User = mongoose.model('User', userSchema)

module.exports = User;