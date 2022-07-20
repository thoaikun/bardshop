const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Product = new Schema({
    name:           { type: String, default: null, index: true, unique: true, required: true},
    price:          { type: Number, default: 0, required: true},
    star:           { type: Number, default: 0},
    type:           { type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
    brand:          { type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
    hf1:            { type: String, default: null},
    hf2:            { type: String, default: null},
    hf3:            { type: String, default: null},
    hf4:            { type: String, default: null},
    description:    { type: String, default: null},
    tech:           { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'techModel'},
    techModel:      { type: String, required: true, enum: ['MoblieTech', 'LaptopTech'] },
    createdAt:      { type: Date, default: Date.now},
    modifiedAt:     { type: Date, default: Date.now},
})

Product.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('Product', Product)