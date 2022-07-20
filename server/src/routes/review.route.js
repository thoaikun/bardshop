const express = require('express')
const router = express.Router()

const { validateReview } = require('../app/middleware/validation')
const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')
const reviewController = require('../app/controllers/ReviewController')

router.get('/:productId', reviewController.getByProductId)
router.use(verifyJWT)
router.post(
    '/create',
    validateReview, 
    reviewController.create
)
router.patch(
    '/edit',
    validateReview,
    reviewController.edit
)
router.delete(
    'delete/:id',
    verifyRole(['admin']),
    reviewController.delete
)
router.get(
    '/',
    verifyRole(['admin']),
    reviewController.index
)

module.exports = router