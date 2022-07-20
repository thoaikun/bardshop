const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    time:   { type: Date, default: Date.now},
    blocks: { type: [Object]}
})

module.exports = mongoose.model('Post', Post)