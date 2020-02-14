const express = require('express')
const router = express.Router()
const knex = require('../../../db')

router.get('/', async (_, res) => {
  const users = await knex('users')

  return res.status(200).send(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await knex('users').where('id', id).first()

  return res.status(200).send(user)
})

module.exports = router
