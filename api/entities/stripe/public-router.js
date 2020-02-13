let express = require('express')
let controller = require('./controller')
let router = new express.Router()

router.get('/', (request, response)=> {
  response.send("WOO")
})
router.post('/submission-fee/checkout-session', controller.createSubmissionFeeCheckoutSession)
router.post('/submission-fee/payment-intent', controller.createSubmissionFeePaymentIntent)
router.post('/webhook', controller.webhook)

module.exports = router
