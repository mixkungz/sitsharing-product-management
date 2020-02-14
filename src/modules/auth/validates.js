const yup = require('yup')

module.exports = {
  loginSchema: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  })
}
