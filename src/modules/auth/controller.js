const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const snakeCaseKeys = require('snakecase-keys')

const knex = require('../../../db')
const { loginSchema, createUserSchema } = require('./validates')

const login = (req, res) => {
  loginSchema.validate(req.body, { abortEarly: false })
    .then(async() => {
      const { username, password, isLongLifeToken = false } = req.body
      const user = await knex('users').where({ username }).first()
    
      if (user === undefined || !bcrypt.compareSync(password, user.password, 10)) {
        return res.status(400).send({ message: 'Invalid username or password' })
      }
      
      const expiredTime = {
        short: { label: '2m', sec: 120 },
        long: { label: '30m', sec: 1800 }
      }
      const expiresIn = isLongLifeToken ? expiredTime.long.label : expiredTime.short.label
      const expiredIn = isLongLifeToken ? expiredTime.long.sec : expiredTime.short.sec

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn })
      return res.status(200).send({ token: token, expiredIn })
    })
    .catch(err => {
      return res.status(500).send(err.errors)
    })
}

const register = (req, res) => {
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
}

const getMyInformation = async(req, res) => {
  const user = await knex('users').where('id', req.userId).first()
  return res.status(200).send(user)
}

module.exports = { login, register, getMyInformation }
