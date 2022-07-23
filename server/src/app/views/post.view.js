class PostView {
    index(res, posts) {
        res
            .status(200)
            .json({
                result: 'success',
                size: posts.length,
                posts
            })
    }

    detail(res, post) {
        res
            .status(200)
            json({
                result: 'success',
                post
            })
    }

    create(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Post has been created'
            })
    }

    upload(res, files) {
        res
            .json({
                "success" : 1,
                "file": {
                    "url" : files.image.filepath
                }
            })
    }

    edit(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Post has been updated'
            })
    }

    delete(res) {
        res
            .status(202)
            .json({
                result: 'success',
                message: 'Post has been deleted'
            })
    }

    destroy(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Post has been destroy'
            })
    }

    error(res, errCode) {
        /* errCode: 1 -> index error message
        **          2 -> detail error message  
        **          3 -> create error message
        **          4 -> edit error message
        **          5 -> destroy error message
        **          7 -> upload image error message
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
                        message: 'Cannot destroy product'
                    })
                break
            case 7:
                res
                    .json({
                        "success" : 0,
                    })
                break
        }
    }
}

module.exports = new PostView