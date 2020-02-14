<template lang="pug">
div
  h4 Application Fee
  p Your application fee is 
    code {{cost}}
    | .
  p We use 
    a(href="https://stripe.com/" target="_blank") Stripe
    |  for payment processing. 
  div(v-show="paymentSubmitted")
    p Payment is being processed...
  div(v-show="!paymentSubmitted")
    label Credit Card Details
    #stripe
    button(@click="purchase") Submit Payment
  #stripe-error
</template>

<script>

// TODO
// Collect contact info from parent component
// Use 'id' to track payments
// Handle *all* the errors!

// Social media stuff
// Deployyyy (how to have environment variables for VueJS?


  let stripe = Stripe('pk_test_vSOv2tJVVsBEI6PZJLJBNiOW')
  let elements = stripe.elements()
  let style = { base: { fontSize: "18px" } }
  let card = elements.create('card', {style})

  export default {
    props: ['clientInfo', 'cost', 'contactInfo'],
    data() {
      return {
        paymentSubmitted: false
      }
    },
    mounted() {
      card.mount("#stripe")
    },
    methods: {
      purchase() {
        this.paymentSubmitted = true
        stripe
          .confirmCardPayment(this.clientInfo, { payment_method: { card, billing_details: { name: 'FAKE NAME' } } })
          .then(response=> {
            if(response.error) {
              alert("Error :(")
              console.log(response.error)
            }
            else {
              if(response.paymentIntent.status == 'succeeded') {
                this.$emit('payment-succeeded')
              }
              else {
                console.log("Payment no bueno")
                console.log(response)
              }
            }
          })
          .catch(error=> {
            alert("Other error")
            console.log(error)
          })
      }
    }
  }
  
// pi_1GBkfuJ9V10cTwL5qAOYhU0I
// pi_1GBkfuJ9V10cTwL5qAOYhU0I_secret_BtT3BL2cXUER6AkxXQmZfEsEL

</script>
