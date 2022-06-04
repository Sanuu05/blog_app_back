const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const postSchema = new mongoose.Schema({
    body:{
        type:String
    },
    photo:{
        type:String
    },
    likes:[{type:ObjectId, ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId, ref:"User"},
        date:{type:String}
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    date:{
        type:String
    }
    

})

const Postdata = mongoose.model('Postdata', postSchema);
module.exports = Postdata