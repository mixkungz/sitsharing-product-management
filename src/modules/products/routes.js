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
  max: 10,
  message:
    "Too request from this IP, please try again in 5 minuntes"
})

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', [limiter, verifyToken], createNewProduct)

router.put('/:id', verifyToken, updateProduct)

router.delete('/:id', verifyToken, deleteProduct)

module.exports = router
