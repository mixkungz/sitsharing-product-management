const yup = require('yup')

module.exports = {
  productSchema: yup.object().shape({
    productName: yup.string().min(2).required(),
    productImage: yup.string(),
    productDetail: yup.string().min(10).required(),
    price: yup.number().positive().required()
  }),
}
