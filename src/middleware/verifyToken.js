require('dotenv').config()

const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) => {
  if (req.headers['authorization'] === undefined)
    return res.status(401).send({ auth: false, message: 'No token provided.' })

  const [_, token] = req.headers['authorization'].split(' ')
  if (token === '') return res.status(403).send({ auth: false, message: 'No token provided.' })
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    console.log('err', err)
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate expired token.' })
    req.userId = decoded.userId
    next()
  })
}

module.exports = verifyToken
