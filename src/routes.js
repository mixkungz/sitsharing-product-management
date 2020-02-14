const express = require('express')
const router = express.Router()

const authRoute = require('./modules/auth/routes')
const userRoute = require('./modules/users/routes')
const productRoute = require('./modules/products/routes')

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/products', productRoute)

module.exports = router
