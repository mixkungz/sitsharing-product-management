const express = require('express')
const rateLimit = require("express-rate-limit")

const verifyToken = require('../../middleware/verifyToken')

const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct
} = require('./controller')

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message:
    "Too request from this IP, please try again in 5 minuntes"
})

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', limiter, createNewProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router
