let express = require('express')
let controller = require('./controller')
let router = new express.Router()

router.post('/submission-fee/checkout-session', controller.createSubmissionFeeCheckoutSession)
router.post('/submission-fee/payment-intent', controller.createSubmissionFeePaymentIntent)

module.exports = router
