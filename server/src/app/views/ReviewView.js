class ReviewView {
    index(res, reviews) {
        res
            .status(200)
            .json({
                result: 'success',
                size: reviews.length,
                reviews
            })
    }

    getByProductId(res, reviews) {
        res
            .status(200)
            .json({
                result: 'success',
                size: reviews.length,
                reviews
            })
    }

    create(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Review has been created'
            })
    }

    edit(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Review has been updated'
            })
    }

    error(res, errCode) {
        /* errCode: 1 -> index error message
        **          2 -> getByProductId error message
        **          3 -> create error message
        **          4 -> edit error message
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
                    .status(404)
                    .json({
                        result: 'failed',
                        message: 'Product not found'
                    })
                break
            case 3:
                    
        }
    }
}

module.exports = new ReviewView