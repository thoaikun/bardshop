const Review = require('../models/user/review.model')

const reviewView = require('../views/review.view')

class ReviewController {
    //[GET] /review
    index(req, res) {
        Review.find({})
              .populate('productId', 'name')
              .populate('userId', 'username')
            .then(reviews => reviewView.index(res, reviews))
            .catch(() => reviewView.error(res, 1))
    }

    //[GET] /review/:productId
    getByProductId(req, res) {
        let productId = req.params.productId
        Review.find({productId}).populate('userId', 'username')
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
        let _id = req.params.id
        if (_id) {
            Review.delete({_id})
                .then(() => reviewView.delete(res))
                .catch(() => reviewView.error(res, 5))
        }
    }

    //[DELETE] /review/force/:id
    destroy(req, res) {
        let _id = req.params.id
        if (_id) {
            Review.deleteOne({_id})
                .then(() => reviewView.destroy(res))
                .catch(() => reviewView.error(res, 6))
        }
    }
}

module.exports = new ReviewController