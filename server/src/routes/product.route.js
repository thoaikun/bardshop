const express = require('express')
const router = express.Router()

const { validateProduct } = require('../app/middleware/validation')
const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')
const productController = require('../app/controllers/product.controller')

router.get('/:id', productController.detail)
router.post(
    '/create',
    verifyJWT, 
    verifyRole(['admin', 'editor']), 
    validateProduct, 
    productController.create
)
router.post(
    '/upload/:id',
    verifyJWT, 
    verifyRole(['admin', 'editor']), 
    productController.upload
)
router.put(
    '/edit',
    verifyJWT, 
    verifyRole(['admin', 'editor']),
    validateProduct, 
    productController.edit
)
router.delete(
    '/delete/:id',
    verifyJWT, 
    verifyRole(['admin', 'editor']), 
    productController.delete
)
router.delete(
    '/force/:id', 
    verifyJWT, 
    verifyRole(['admin', 'editor']), 
    productController.destroy
)
router.patch(
    '/restore/:id', 
    verifyJWT, 
    verifyRole(['admin', 'editor']), 
    productController.restore
)
router.get(
    '/deletedlist', 
    verifyJWT, 
    verifyRole(['admin', 'editor']),
    productController.deletedList
)
router.get('/', productController.index)

module.exports = router