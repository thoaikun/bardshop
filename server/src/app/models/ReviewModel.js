const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Review = new Schema({
    productId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating:     { type: Number, default: 0},
    body:       { type: String, default: ''},
    createdAt:  { type: Date, default: Date.now}
})

Review.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('Review', Review)