require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit")

const routes = require('./src/routes')

const app = express()
const port = process.env.PORT || 3000

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
});

app.set('trust proxy', 1)

// ----------------------
//     INITIAL SERVER
// ----------------------
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// ----------------------

app.listen(port, () => {
  console.log('Express server listening on port ' + port)
})

app.get('/api/v1', (_, res) => {
  return res.status(200).send({ message: 'API Work !'})
})

app.use('/api/v1', apiLimiter, routes)
