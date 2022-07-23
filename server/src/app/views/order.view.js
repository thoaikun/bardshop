class OrderView {
    index(res, orders) {
        res
            .status(200)
            .json({
                result: 'success',
                size: orders.length,
                orders
            })
    }

    getByUserId(res, orders) {
        res
            .status(200)
            .json({
                result: 'success',
                size: orders.length,
                orders
            })
    }

    create(res) {
        res
            .status(202)
            .json({
                result: 'success',
                message: 'Order has been created'
            })
    }

    delete(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Order has been deleted'
            })
    }

    destroy(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Order has been destroyed'
            })
    }

    error(res, errCode) {
        /* errCode: 1 -> index error message
        **          2 -> getByUserId error message  
        **          3 -> create error message
        **          4 -> delete error message
        **          5 -> destroy error message
        */
        switch(errCode) {
            case 1:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Something were wrong'
                    })
                break
            case 2:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'User not found'
                    })
                break
            case 3:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Cannot create order'
                    })
                break
            case 4:
            case 5:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Cannot delete order'
                    })
                break
        }
    }
}

module.exports = new OrderView