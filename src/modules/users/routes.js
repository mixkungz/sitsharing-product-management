const express = require('express')

const verifyToken = require('../../middleware/verifyToken')
const { getAllUsers, getUserById } = require('./controller')

const router = express.Router()


router.get('/', verifyToken, getAllUsers)

router.get('/:id', verifyToken, getUserById)

module.exports = router
