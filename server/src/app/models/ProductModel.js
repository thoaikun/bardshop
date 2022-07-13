const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Product = new Schema({
    name:           { type: String, default: null, index: true, unique: true, required: true},
    price:          { type: Number, default: 0, required: true},
    star:           { type: Number, default: 0},
    type:           { type: String, default: 'Smartphone'},
    brand:          { type: String, default: null},
    hf1:            { type: String, default: null},
    hf2:            { type: String, default: null},
    hf3:            { type: String, default: null},
    hf4:            { type: String, default: null},
    description:    { type: String, default: null},
    screenSize:     { type: Number, default: null},
    screenTech:     { type: String, default: null},
    resolution:     { type: String, default: null},
    refeshRate:     { type: Number, default: null},
    backcam:        { type: String, default: null},
    backcamVideo:   { type: String, default: null},
    backcamFeature: { type: String, default: null},
    frontcam:       { type: String, default: null},
    frontcamVideo:  { type: String, default: null},
    cpuChipset:     { type: String, default: null},
    cpuTech:        { type: String, default: null},        
    gpu:            { type: String, default: null},
    ram:            { type: Number, default: null},
    rom:            { type: Number, default: null},
    bateryCap:      { type: Number, default: null},
    bateryCharge:   { type: String, default: null},
    bateryPort:     { type: String, default: null},
    sim:            { type: String, default: null},
    os:             { type: String, default: null},
    nfc:            { type: String, default: null},
    support:        { type: String, default: null},
    wifi:           { type: String, default: null},
    bluetooth:      { type: String, default: null},
    gps:            { type: String, default: null},
    weight:         { type: String, default: null},
    material:       { type: String, default: null},
    border:         { type: String, default: null},
    createdAt:      { type: Date, default: Date.now},
    modifiedAt:      { type: Date, default: Date.now},
})

Product.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('Product', Product)