const express = require('express')
const router = express.Router()

const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')
const orderController = require('../app/controllers/order.controller')

router.use(verifyJWT)
router.get(
    '/:userId',
    verifyRole(['customer', 'editor', 'admin']),
    orderController.getByUserId
)
router.post(
    '/create',
    verifyRole(['customer', 'editor', 'admin']),
    orderController.create
)
router.delete(
    '/delete/:id',
    verifyRole(['customer', 'editor', 'admin']),
    orderController.delete
)
router.delete(
    '/force/:id', 
    verifyRole(['admin']),
    orderController.destroy
)
router.get(
    '/', 
    verifyRole(['admin']),
    orderController.index
)

module.exports = router