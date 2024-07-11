const express = require('express')
const router = express.Router()
const { uploadImage, getImage, searchImage } = require('../controller/image.controller')

router.route('/new').post(uploadImage)

router.route('/:id').get(getImage)

router.route('/searchImage').get(searchImage)

module.exports = router