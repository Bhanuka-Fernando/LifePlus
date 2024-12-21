const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required']
    },
    email:{
        type:String,
        required:[true, 'Email is Required']
    },
    password:{
        type:String,
        required:[true, 'Password is Required']
    }

})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel