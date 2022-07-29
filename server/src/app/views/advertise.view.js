class AdvertiseView {
    index(res, ads) {
        res
            .status(200)
            .json({
                result: 'success',
                size: ads.length,
                ads
            })
    }

    getByType(res, ads) {
        res
            .status(200)
            .json({
                result: 'success',
                size: ads.length,
                ads
            })
    }

    upload(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Upload images success'
            })
    }

    delete(res) {
        res
            .status(202)
            .json({
                result: 'success',
                message: 'Banner has been deleted'
            })
    }

    error(res, errCode) {
        /* errCode: 1 -> index error message
        **          2 -> getByType error message  
        **          3 -> upload error message
        **          4 -> delete error message
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
                        message: 'Something were wrong'
                    })
                break
            case 3:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Upload image failed'
                    })
                break
            case 4:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Cannot delete banner'
                    })
                break
        }
    }
}

module.exports = new AdvertiseView