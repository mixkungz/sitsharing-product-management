const express = require('express')

const verifyToken = require('../../middleware/verifyToken')
const { login, register, getMyInformation } = require('./controller')

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.get('/me', verifyToken, getMyInformation)


module.exports = router
