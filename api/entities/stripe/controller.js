let model = require('./model')

let controller = {
  async createSubmissionFeeCheckoutSession(request, response) {
    response.json(await model.createSubmissionFeeCheckoutSession())
  },
  async createSubmissionFeePaymentIntent(request, response) {
    response.json(await model.createSubmissionFeePaymentIntent())
 },
  async webhook(request, response) {
    response.json(model.handleWebhook(request.body))
  }
}

module.exports = controller
