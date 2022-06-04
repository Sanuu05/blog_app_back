const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types
const userScehma = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // password:{
    //     type:String,
    //     required:true
    // },
    profilePic:{
        type:String,
        default:'https://ischool.ubc.ca/files/2016/10/cropped-No-Face-Picture.jpg'
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}]
})

const User = mongoose.model('User',userScehma)
module.exports = User