const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    //when we do this it will tell us when these fields are created or updated
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports = User;