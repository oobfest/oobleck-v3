let stripe = require('stripe')(process.env.STRIPE_KEY)

let model = {
  async createSubmissionFeeCheckoutSession() {
    return await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: 'T-shirt',
        description: 'Comfortable cotton t-shirt',
        images: ['https://example.com/t-shirt.png'],
        amount: 500,
        currency: 'usd',
        quantity: 1,
      }],
      success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/cancel'
    })
  },
  async createSubmissionFeePaymentIntent() {
    return await stripe.paymentIntents.create({
      amount: 500,
      currency: 'usd'
    })
  }
}

module.exports = model
