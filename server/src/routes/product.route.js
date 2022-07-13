const express = require('express')
const router = express.Router()

const { validateProduct } = require('../app/middleware/validation')
const productController = require('../app/controllers/ProductController')

router.get('/:id', productController.detail)
router.post('/create', validateProduct, productController.create)
router.put('/edit', validateProduct, productController.edit)
router.delete('/delete/:id', productController.delete)
router.delete('/force/:id', productController.destroy)
router.patch('/restore/:id', productController.restore)
router.get('/deletedlist', productController.deletedList)
router.get('/', productController.index)

module.exports = router