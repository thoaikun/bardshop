const express = require('express')
const router = express.Router()

const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')
const orderController = require('../app/controllers/order.controller')

router.get('/:userId', orderController.getByUserId)
router.post('/create', orderController.create)
router.delete('/delete/:id', orderController.delete)
router.delete('/force/:id', orderController.destroy)
router.get('/', orderController.index)

module.exports = router