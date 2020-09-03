const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    text: {
        type: String,
        required:true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required:true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date:{
                type:Date,
                default: Date.now
            }
        }
    ]
    

})


const Post = mongoose.model('post', PostSchema);
module.exports = Post;