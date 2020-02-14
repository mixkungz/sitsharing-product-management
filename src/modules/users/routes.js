const express = require('express')
const bcrypt = require('bcrypt')
const snakeCaseKeys = require('snakecase-keys')

const router = express.Router()

const knex = require('../../../db')
const { createUserSchema } = require('./validates')

router.get('/', async (_, res) => {
  const users = await knex('users')

  return res.status(200).send(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await knex('users').where('id', id).first()

  return res.status(200).send(user)
})

router.post('/', (req, res) => {
  createUserSchema.validate(req.body, { abortEarly: false })
    .then(async() => {
      const { password: plainTextPassword } = req.body
      const password = bcrypt.hashSync(plainTextPassword, 10)
      req.body.password = password
      req.body.birthDate = new Date(req.body.birthDate)

      req.body = snakeCaseKeys(req.body)
      try {
        const [userId] = await knex('users').insert(req.body)
        const user = await knex('users').where('id', userId)

        return res.status(201).send(user)
      } catch (error) {
        return res.status(500).send({
          message: error.sqlMessage
        })
      }
    })
    .catch(err => {
      return res.status(400).send(err.errors)
    })
})

module.exports = router
