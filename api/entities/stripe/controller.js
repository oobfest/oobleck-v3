let model = require('./model')

let controller = {
  async createSubmissionFeeCheckoutSession(request, response) {
    response.json(await model.createSubmissionFeeCheckoutSession())
  },
  async createSubmissionFeePaymentIntent(request, response) {
    response.json(await model.createSubmissionFeePaymentIntent())
  }
}

module.exports = controller
