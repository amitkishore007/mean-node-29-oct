const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        require:[true, 'Post title is required']
    },
    content: {
        type: String,
        required:[true,'Post content is required']
    },
    imagepath:{
        type:String,
        required:[true,'post image is requied']
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;