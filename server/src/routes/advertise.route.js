const express = require('express')
const router = express.Router()

const advertiseController = require('../app/controllers/advertise.controller')

router.post('/upload', advertiseController.upload)
router.delete('/delete/:id', advertiseController.delete)
router.get('/:type', advertiseController.getByType)
router.get('/', advertiseController.index)

module.exports = router