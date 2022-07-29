const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Advertise = new Schema({
    name:   { type: String, required: true, unique: true },
    type:   { type: String, default: null}
})

module.exports = mongoose.model('Advertise', Advertise)