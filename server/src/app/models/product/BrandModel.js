const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Brand = new Schema({
    name:       {type: String, default: null, unique: true},
    type:       { type: mongoose.Schema.Types.ObjectId, ref: 'Type'}
})

module.exports = mongoose.model('Brand', Brand)