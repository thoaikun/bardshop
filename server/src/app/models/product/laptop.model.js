const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LaptopTech = new Schema({
    cpu:            {type: String, default: null},
    gpu:            {type: String, default: null},
    ram:            {type: Number, default: null},
    screenSize:     {type: Number, default: null},
    resolution:     {type: String, default: null},
    screenTech:     {type: String, default: null},
    port:           {type: String, default: null},
    batery:         {type: String, default: null},
    os:             {type: String, default: null},
    webcam:         {type: String, default: null},
    wifi:           {type: String, default: null},
    bluetooth:      {type: String, default: null},
    audio:          {type: String, default: null},
    size:           {type: String, default: null},
    weight:         {type: Number, default: null},
    material:       {type: String, default: null}
})

module.exports = mongoose.model('LaptopTech', LaptopTech)