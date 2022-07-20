const Review = require('../models/user/ReviewModel')
const User = require('../models/user/UserModel')
const Product = require('../models/product/ProductModel')

const reviewView = require('../views/ReviewView')

class ReviewController {
    //[GET] /review
    index(req, res) {
        Review.find({})
            .then(reviews => reviewView.index(res, reviews))
            .catch(() => reviewView.error(res, 1))
    }

    //[GET] /review/:productId
    getByProductId(req, res) {
        let productId = req.params.productId
        Review.find({productId})
            .then(reviews => reviewView.getByProductId(res, reviews))
            .catch(() => reviewView.error(res, 2))
    }

    //[POST] /review/create
    create(req, res) {
        if (req.review) {
            let newReview = new Review(req.review)
            newReview.save()
                .then(() => reviewView.create(res))
                .catch(() => reviewView.error(res, 3))
        }
    }

    //[PATCH] /review/edit
    edit(req, res) {
        let _id = req.body.id
        if (req.review) {
            req.review.modifiedAt = Date.now()
            Review.findOneAndUpdate({_id}, req.review)
                .then(() => reviewView.edit(res))
                .catch(() => reviewView.err(res, 4))
        }
    }

    //[DELETE] /review/delete/:id
    delete(req, res) {

    }
}

module.exports = new ReviewController