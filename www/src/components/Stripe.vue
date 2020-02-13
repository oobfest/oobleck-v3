<template lang="pug">
div
  h4 Application Fee
  p We use 
    a(href="https://stripe.com/" target="_blank") Stripe
    |  for payment processing.
  label Credit Card Details
  #stripe(v-show="!paymentSubmitted")
  p(v-show="paymentSubmitted") Payment submitted...
  #stripe-error
  button(@click="purchase") Submit Payment
</template>

<script>
  let stripe = Stripe('pk_test_vSOv2tJVVsBEI6PZJLJBNiOW')
  let elements = stripe.elements()
  let style = { base: { fontSize: "18px" } }
  let card = elements.create('card', {style})

  export default {
    props: ['clientInfo'],
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
                this.$emit('payment-submitted')
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
  
</script>
