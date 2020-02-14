const express = require('express')
const snakeCaseKeys = require('snakecase-keys')

const knex = require('../../../db')
const { createProductSchema } = require('./validates')

const router = express.Router()

router.get('/', async(_, res) => {
  const products = await knex('products')

  return res.status(200).send(products)
})

router.get('/:id', async(req, res) => {
  const { id } = req.params
  const product = await knex('products').where({ id }).first()

  return res.status(200).send(product)
})

router.post('/', (req, res) => {
  createProductSchema.validate(req.body, { abortEarly: false })
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
      return res.status(400).send(err.errors)
    })
})

module.exports = router
