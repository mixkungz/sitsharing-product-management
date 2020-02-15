const yup = require('yup')

module.exports = {
  loginSchema: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    isLongLifeToken: yup.boolean()
  }),
  createUserSchema: yup.object().shape({
    username: yup.string().min(6).required(),
    password: yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must has minimum eight characters, at least one letter and one number"),
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
    birthDate: yup.date().required(),
    sex: yup.string().matches(/(male|female)/).required()
  })
}
