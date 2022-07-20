const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Review = new Schema({
    productId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rating:     { type: Number, default: 0},
    body:       { type: String, default: ''},
    createdAt:  { type: Date, default: Date.now},
    modifiedAt: { type: Date, default: Date.now}
})

Review.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('Review', Review)