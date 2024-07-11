const express = require('express')
const router = express.Router()
const { getFolderContent, createFolder } = require('../controller/folder.controller')

router.post('/create')
    .post(createFolder)

router.route('/:id')
    .get(getFolderContent)

module.exports = router