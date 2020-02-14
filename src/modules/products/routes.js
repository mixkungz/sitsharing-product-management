const express = require('express')

const verifyToken = require('../../middleware/verifyToken')

const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct
} = require('./controller')

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', verifyToken, createNewProduct)

router.put('/:id', verifyToken, updateProduct)

router.delete('/:id', verifyToken, deleteProduct)

module.exports = router
