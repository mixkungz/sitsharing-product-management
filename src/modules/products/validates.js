const yup = require('yup')

module.exports = {
  createProductSchema: yup.object().shape({
    productName: yup.string().min(2).required(),
    productImage: yup.string(),
    productDetail: yup.string().min(10).required(),
    stock: yup.number().positive().required()
  })
}
