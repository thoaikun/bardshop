const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const User = new Schema({
    email:          { type: String, default: null, index: true, unique: true, required: true},
    username:       { type: String, default: null, index: true, unique: true, required: true},
    password:       { type: String, default: null, required: true},
    firstname:      { type: String, default: ''},
    lastname:       { type: String, default: ''},
    contactNumber:  { type: String, default: ''},
    address:        { type: String, default: ''},
    district:       { type: String, default: ''},
    city:           { type: String, default: ''},
    role:           { type: Number, default: 0}
})

User.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('User', User)