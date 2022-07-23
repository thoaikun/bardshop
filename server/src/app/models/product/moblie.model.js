const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoblieTech = new Schema({
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
})

module.exports = mongoose.model('MoblieTech', MoblieTech)

