class ProductView {
    index(res, products) {
        res
            .status(200)
            .json({
                result: 'success',
                size:  products.length,
                products
            })
    }

    detail(res, product) {
        res
            .status(200)
            .json({
                result: 'success',
                product
            })
    }

    create(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Product has been created'
            })
    }

    edit(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Product has been update'
            })
    }

    delete(res) {
        res
            .status(200)
            .json({
                result: 'success',
                message: 'Product has been deleted'
            })
    }

    destroy(res) {
        res
            .status(200)
            .json({
                result: 'success',
                message: 'Product has been detroyed'
            })
    }

    restore(res) {
        res.status(201).json({
            result: 'success',
            message: 'Product has been restore'
        })
    }

    deletedList(res, products) {
        res
            .status(200)
            .json({
                result: 'success',
                size: products.length,
                products
            })
    }

    error(res, errCode) {
        /* errCode: 1 -> index error message
        **          2 -> detail error message  
        **          3 -> create error message
        **          4 -> edit error message
        **          5 -> delete error message
        **          6 -> destroy error message
        **          7 -> restore error message
        **          8 -> deletedList error message
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
                        message: 'Product not found'
                    })
                break
            case 3:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Create product unsuccess'
                    })
                break
            case 4:
                res
                    .status(404)
                    .json({
                        result: 'failed',
                        message: 'Product not found'
                    })
                break
            case 5:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Cannot delete product'
                    })
                break
            case 6:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Cannot destroy product'
                    })
                break
            case 7:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Cannot restore product'
                    })
                break
            case 8:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Somthing were wrong'
                    })
                break
        }
    }
}

module.exports = new ProductView