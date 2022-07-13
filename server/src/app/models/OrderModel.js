const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const OrderList = new Schema({
    productId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity:   { type: Number, default: 1}
})

const Order = new Schema({
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orderList:  { type: [OrderList], default: null},
    createdAt:  { type: Date, default: Date.now}
})

Order.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('Order', Order)