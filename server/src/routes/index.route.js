const userRouter = require('./user.route')
const authRouter = require('./auth.route')
const productRouter = require('./product.route')
const reviewRouter = require('./review.route')
const orderRouter = require('./order.route')


function route(app) {
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/product', productRouter)
    app.use('/review', reviewRouter)
    app.use('/order', orderRouter)
}

module.exports = route