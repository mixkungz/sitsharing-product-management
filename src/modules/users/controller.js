const knex = require('../../../db')

const getAllUsers = async (_, res) => {
  const users = await knex('users')

  return res.status(200).send(users)
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await knex('users').where('id', id).first()

  return res.status(200).send(user)
}

module.exports = { getAllUsers, getUserById }
