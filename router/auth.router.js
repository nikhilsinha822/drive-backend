const express = require('express')
const router = express.Router()
const { login, register, userLogout } = require('../controller/auth.controller')

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)

router.route('/logout')
    .post(userLogout)

module.exports = router