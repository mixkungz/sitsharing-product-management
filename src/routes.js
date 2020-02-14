const express = require('express')
const router = express.Router()

const userRoute = require('./modules/users/routes')

router.use('/users', userRoute)

module.exports = router
