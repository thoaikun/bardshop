const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.post('/login', authController.login)
router.post('/renewAccess', authController.renewAccessToken)
router.post('/logout', authController.logout)

module.exports = router