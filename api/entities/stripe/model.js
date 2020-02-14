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
  async createSubmissionFeePaymentIntent(castSize) {
    let isGroup = castSize >= 3
    let amount = null
    let april1st = 1585717200000
    let march1st = 1583042400000

    // Is this happening after March 1st? (Late)
    if(Date.now() > march1st) { amount = isGroup ? 5500 : 3500 }

    // Is this happening before April 1st? (Early)
    else if (Date.now() < april1st) { amount = isGroup ? 3500 : 1500 }

    // It's happening after April 1st, but before March 1st
    else { amount = isGroup ? 4500 : 2500 }

    return await stripe.paymentIntents.create({ amount, currency: 'usd' })
  },
  handleWebhook(event) {
    console.log(event)
    if(event.type == 'charge.succeeded') { }
  }
}

module.exports = model
