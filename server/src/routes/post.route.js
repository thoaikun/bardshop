const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/post.controller')
const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')

router.get('/:id', postController.detail)
router.post(
    '/create',
    verifyJWT,
    verifyRole(['admin', 'editor']),
    postController.create
)
router.put(
    '/edit', 
    verifyJWT,
    verifyRole(['admin', 'editor']),
    postController.edit
)
router.delete(
    '/delete/:id', 
    verifyJWT,
    verifyRole(['admin', 'editor']),
    postController.destroy
)
router.post('/upload', postController.upload)
router.get('/', postController.index)

module.exports = router