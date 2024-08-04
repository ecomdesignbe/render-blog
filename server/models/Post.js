const mongoose = require('mongoose')

const Schema = mongoose.Schema
// SCHEMA DE LA TABLE POST
const PostSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    
    body : {
        type: String,
        required: true
    },
    
    createdAt : {
        type: Date,
        default: Date.now
    },
    
    updatedAt : {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Post', PostSchema)