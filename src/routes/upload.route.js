const express = require('express')
const router = express.Router()
const { upload, destroy } = require('../controllers/upload.controller')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/auth')

// Allow admin to use these routes
router.route('/upload').post(verifyToken, verifyTokenAdmin, upload)

router.route('/destroy').post(verifyToken, verifyTokenAdmin, destroy)

module.exports = router
