const express = require('express')
const router = express.Router()

const { validateSignUp, validateEditUser } = require('../app/middleware/validation')
const userController = require('../app/controllers/UserController')

router.post('/create', validateSignUp, userController.create)
router.patch('/edit', validateEditUser, userController.edit)
router.get('/:id', userController.index)

module.exports = router