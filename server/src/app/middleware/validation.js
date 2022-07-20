const validateEmail = (email) => {
    return String(email)
                .toLowerCase()
                .match( 
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
}

const validateSignUp = (req, res, next) => {
    if (req.body) {
        if (req.body.username === '')
            res
                .status(400)
                .json({ 
                    result: 'failed',
                    message: 'Username must not be empty' 
                })
        else if (req.body.email === '')
            res
                .status(400)
                .json({ 
                    result: 'failed',
                    message: 'Email must not be empty' 
                })
        else if (!validateEmail(req.body.email))
            res
                .status(400)
                .json({
                    result: 'failed', 
                    message: 'Invalid email' 
                })
        else if (req.body.password.length <= 5)
            res
                .status(400)
                .json({ 
                    result: 'failed', 
                    message: 'Password must at least 6 characters' 
                })
        else {
            req.username = req.body.username
            req.email = req.body.email
            req.password = req.body.password
            return next()
        }
    }
    else {
        res
            .status(400)
            .json({ 
                result: 'failed', 
                message: 'No input found'
            })
    }
}

const validateEditUser = (req, res, next) => {
    if (res.body?.username && req.body.username === '')
        res
            .status(400)
            .json({ 
                result: 'failed',
                message: 'Username must not be empty' 
            })
    else if (req.body?.email && req.body.email === '')
        res
            .status(400)
            .json({ 
                result: 'failed',
                message: 'Email must not be empty' 
            })
    else if (req.body?.email && !validateEmail(req.body.email))
        res
            .status(400)
            .json({
                result: 'failed', 
                message: 'Invalid email' 
            })
    else {
        req.editedUser = {}
        if (req.body?.username)
            req.editedUser.username = req.body.username
        if (req.body?.email)
            req.editedUser.email = req.body.email
        if (req.body?.firstname)
            req.editedUser.firstname = req.body.firstname
        if (req.body?.lastname)
            req.editedUser.lastname = req.body.lastname
        if (req.body?.contactNumber)
            req.editedUser.contactNumber = req.body.contactNumber
        if (req.body?.address)
            req.editedUser.address = req.body.address
        if (req.body?.district)
            req.editedUser.district = req.body.district
        if (req.body?.city)
            req.editedUser.city = req.body.city

        console.log(req.editedUser)
        return next()
    }
}

const validateProduct = (req, res, next) => {
    if (req.body) {
        if (req.body.name === '')
            res
                .status(400)
                .json({
                    result: 'failed',
                    message: 'Require a name for product'
                })
        else if (req.body.price === '') 
            res
                .status(400)
                .json({
                    result: 'failed',
                    message: 'Require a price for product'
                })
        else if (req.body.type === '')
            res
                .status(400)
                .json({
                    result: 'failed',
                    message: 'Require a type of product'
                })
        else if (req.body.brand === '')
            res
                .status(400)
                .json({
                    result: 'failed',
                    message: 'Require a brand of product'
                }) 
        else {
            req.product = {
                name:           req.body.name,
                price:          req.body.price,
                star:           req.body?.star          ? req.body.star          : null,
                hf1:            req.body?.hf1           ? req.body.hf1           : null,
                hf2:            req.body?.hf2           ? req.body.hf2           : null,
                hf3:            req.body?.hf3           ? req.body.hf3           : null,
                hf4:            req.body?.hf4           ? req.body.hf4           : null,
                description:    req.body?.description   ? req.body.description   : null
            }
            req.tech = {
                screenSize:     req.body?.screenSize    ? req.body.screenSize    : null,
                screenTech:     req.body?.screenTech    ? req.body.screenTech    : null,
                resolution:     req.body?.resolution    ? req.body.resolution    : null,
                refeshRate:     req.body?.refeshRate    ? req.body.refeshRate    : null,
                backcam:        req.body?.backcam       ? req.body.backcam       : null,
                backcamVideo:   req.body?.backcamVideo  ? req.body.backcamVideo  : null,
                backcamFeature: req.body?.backcamFeature? req.body.backcamFeature: null,
                frontcam:       req.body?.frontcam      ? req.body.frontcam      : null,
                frontcamVideo:  req.body?.frontcamVideo ? req.body.frontcamVideo : null,
                cpuChipset:     req.body?.cpuChipset    ? req.body.cpuChipset    : null,
                cpuTech:        req.body?.cpuTech       ? req.body.cpuTech       : null,        
                gpu:            req.body?.gpu           ? req.body.gpu           : null,
                ram:            req.body?.ram           ? req.body.ram           : null,
                rom:            req.body?.rom           ? req.body.ram           : null,
                bateryCap:      req.body?.bateryCap     ? req.body.bateryCap     : null,
                bateryCharge:   req.body?.bateryCharge  ? req.body.bateryCharge  : null,
                bateryPort:     req.body?.bateryPort    ? req.body.bateryPort    : null,
                sim:            req.body?.sim           ? req.body.sim           : null,
                os:             req.body?.os            ? req.body.os            : null,
                nfc:            req.body?.nfc           ? req.body.nfc           : null,
                support:        req.body.support        ? req.body.support       : null,
                wifi:           req.body.wifi           ? req.body.wifi          : null,
                bluetooth:      req.body.bluetooth      ? req.body.bluetooth     : null,
                gps:            req.body.gps            ? req.body.gps           : null,
                weight:         req.body.weight         ? req.body.weight        : null,
                material:       req.body.material       ? req.body.material      : null,
                border:         req.body.border         ? req.body.material      : null
            }
            req.type = req.body?.type ? req.body.type : null
            req.brand = req.body?.brand ? req.body.brand : null
            return next()
        }
    }
    else
        res
            .status(400)
            .json({
                result: 'failed',
                message: 'No input found'
            })
}

const validateReview = (req, res, next) => {
    if (req.body) {
        if (req.body.rating && req.body.rating === '')
            res
                .status(400)
                .json({
                    result: 'failed',
                    message: 'Require rating point for review'
                })
        else if (req.body.rating < 0 || req.body.rating > 5) 
            res
                .status(400)
                .json({
                    result: 'failed',
                    message: 'Rating point must between 0 and 5'
                }) 
        else {
            req.review = {
                productId: req.body.productId,
                userId: req.body.userId,
                rating: req.body.rating,
                body: req.body.body
            }
            return next()
        }
    }
    else 
        res
            .status(400)
            .json({
                result: 'failed',
                message: 'No input found'
            })
}

module.exports = { validateSignUp, validateProduct, validateEditUser, validateReview }