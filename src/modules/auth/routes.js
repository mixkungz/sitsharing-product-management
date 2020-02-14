const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const knex = require('../../../db')
const { loginSchema } = require('./validates')

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

module.exports = router
