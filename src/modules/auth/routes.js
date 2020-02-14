const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const snakeCaseKeys = require('snakecase-keys')

const knex = require('../../../db')
const { loginSchema, createUserSchema } = require('./validates')

const router = express.Router()

router.post('/login', (req, res) => {
  loginSchema.validate(req.body, { abortEarly: false })
    .then(async() => {
      const { username, password } = req.body
      const user = await knex('users').where({ username }).first()
    
      if (user === undefined || !bcrypt.compareSync(password, user.password, 10)) {
        return res.status(400).send({ message: 'Invalid username or password' })
      }
    
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '20s'
      })
      return res.status(200).send({ token: token, expiredIn: 20 })
    })
    .catch(err => {
      return res.status(500).send(err.errors)
    })
})

router.post('/register', (req, res) => {
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
