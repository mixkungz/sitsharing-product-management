const express = require('express')
const rateLimit = require("express-rate-limit")

const verifyToken = require('../../middleware/verifyToken')
const { login, register, getMyInformation } = require('./controller')

const router = express.Router()

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message:
    "Too request from this IP, please try again in 5 minuntes"
})

router.post('/login', login)

router.post('/register', limiter, register)

router.get('/me', verifyToken, getMyInformation)


module.exports = router
