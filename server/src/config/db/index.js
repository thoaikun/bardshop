const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://bardshop:12345@cluster0.tvenq.mongodb.net/bardshop?retryWrites=true&w=majority');
        console.log('Connect successfully !!')
    }
    catch (err) {
        console.log('Connect failure !!')
    }
}


module.exports = { connect }