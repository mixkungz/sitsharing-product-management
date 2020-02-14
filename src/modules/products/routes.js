const express = require('express')

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

router.post('/', createNewProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router
