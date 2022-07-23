const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Type = new Schema({
    name:       {type: String, default: null, unique: true}
})

module.exports = mongoose.model('Type', Type)