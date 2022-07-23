const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/post.controller')
const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')

router.get('/:id', postController.detail)
router.post('/create', postController.create)
router.post('/upload', postController.upload)
router.put('/edit', postController.edit)
router.delete('/delete/:id', postController.destroy)
router.get('/', postController.index)

module.exports = router