const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    author: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Number
    }
});

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;