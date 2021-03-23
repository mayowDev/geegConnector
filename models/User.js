const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    googleId:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        // required: true,
     },
    avatar: {
        type: String
    },
    data:{
        type: Date,
        default: Date.now

    }

})

const User = mongoose.model('user', UserSchema);
module.exports = User;