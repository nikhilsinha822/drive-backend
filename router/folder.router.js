const express = require('express')
const router = express.Router()
const { getFolderContent, createFolder } = require('../controller/folder.controller')
const { validateToken } = require('../middleware/auth.middleware')

router.route('/')
    .get(validateToken, getFolderContent)
    
router.route('/create')
    .post(validateToken, createFolder)


module.exports = router