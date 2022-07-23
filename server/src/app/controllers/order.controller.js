const Order = require('../models/user/order.model')
const orderView = require('../views/order.view')

class OrderController {
    //[GET] /order
    index(req, res) {
        Order.find({})
            .populate('userId', 'username contactNumber address district city')
            .then(orders => orderView.index(res, orders))
            .catch(() => orderView.error(res, 1))
    }

    //[GET] /order/:userId
    getByUserId(req, res) {
        const userId = req.params.userId
        Order.find({userId})
            .populate({
                path: 'orderList',
                populate: {
                    path: 'productId',
                    select: {'name': 1, 'price': 1, 'imgs': 1}
                }
            })
            .then(orders => orderView.getByUserId(res, orders))
            .catch((err) => {
                console.log(err)
                orderView.error(res, 2)
            }) 
    }

    //[POST] /order/create
    create(req, res) {
        let orderForm = req.body.order
        if (orderForm) {
            const order = new Order(orderForm)
            order.save()
                .then(() => orderView.create(res))
                .catch(() => orderView.error(res, 3))
        }
    }

    //[DELETE] /order/delete/:id
    delete(req, res) {
        const _id = req.params.id
        Order.delete({_id})
            .then(() => orderView.delete(res))
            .catch(() => orderView.error(res, 4))
    }

    //[DELETE] /order/force/:id
    destroy(req, res) {
        const _id = req.params.id
        Order.deleteOne({_id})
            .then(() => orderView.destroy(res))
            .catch(() => orderView.error(res, 5))
    }
}

module.exports = new OrderController