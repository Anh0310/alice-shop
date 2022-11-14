const express = require('express')
const router = express.Router()
const { payment } = require('../controllers/payment.controller')
const { verifyToken } = require('../middlewares/auth')

router.route('/payments').post(verifyToken, payment)

module.exports = router
