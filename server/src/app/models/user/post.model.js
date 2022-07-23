const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    time:       { type: Date, default: Date.now},
    version:    { type: String, default: null},
    blocks:     { type: [Object], default: null},
    thumnail:   { type: String, default: null},
    title:      { type: String, default: null}
})

module.exports = mongoose.model('Post', Post)