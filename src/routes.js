const express = require('express')
const router = express.Router()

const userRoute = require('./modules/users/routes')
const productRoute = require('./modules/products/routes')

router.use('/users', userRoute)
router.use('/products', productRoute)

module.exports = router
