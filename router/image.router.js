const express = require('express')
const router = express.Router()
const { uploadImage, getImage, searchImage } = require('../controller/image.controller')
const upload = require('../middleware/multerConfig.middleware')
const { validateToken } = require('../middleware/auth.middleware')


router.route('/new').post(validateToken, upload.array('image'), uploadImage)

router.route('/search').get(validateToken, searchImage)

router.route('/:id').get(validateToken, getImage)

module.exports = router