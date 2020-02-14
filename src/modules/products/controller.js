const snakeCaseKeys = require('snakecase-keys')

const knex = require('../../../db')
const { productSchema } = require('./validates')

const getAllProducts = async(_, res) => {
  const products = await knex('products')

  return res.status(200).send(products)
}

const getProductById = async(req, res) => {
  const { id } = req.params
  const product = await knex('products').where({ id }).first()

  return res.status(200).send(product)
}

const createNewProduct = (req, res) => {
  productSchema.validate(req.body, { abortEarly: false })
    .then(async() => {
      req.body = snakeCaseKeys(req.body)

      try {
        const [productId] = await knex('products').insert(req.body)
        const product = await knex('products').where('id', productId).first()

        return res.status(200).send(product)
      } catch (error) {
        return res.status(400).send({
          message: error.sqlMessage
        })
      }
    })
    .catch(err => {
      return res.status(500).send(err.errors)
    })
}

const updateProduct = (req, res) => {
  productSchema.validate(req.body, { abortEarly: false })
    .then(async() => {
      const { id } = req.params
      req.body = snakeCaseKeys(req.body)

      try {
        await knex('products').where({ id }).update(req.body)
        const product = await knex('products').where({ id }).first()

        return res.status(200).send(product)
      } catch (error) {
        return res.status(500).send(err.errors)
      }
    })
    .catch(err => {
      return res.status(400).send(err.errors)
    })
}

const deleteProduct = async(req, res) => {
  const { id } = req.params
  await knex('products').where({ id }).del()

  return res.status(204).send()
}

module.exports = { getAllProducts, getProductById, createNewProduct, updateProduct, deleteProduct }
