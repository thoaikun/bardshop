const express = require('express')
const router = express.Router()

const { validateSignUp, validateEditUser } = require('../app/middleware/validation')
const verifyJWT = require('../app/middleware/verifyJWT')
const verifyRole = require('../app/middleware/verifyRole')
const userController = require('../app/controllers/user.controller')

router.post('/create', validateSignUp, userController.create)
router.use(
    verifyJWT, 
    verifyRole(['customer', 'admin', 'editor'])
)
router.patch('/edit', validateEditUser, userController.edit)
router.get('/', userController.index)

module.exports = router