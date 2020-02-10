<template lang="pug">
div
  h4 Application Fee
  p We use 
    a(href="https://stripe.com/" target="_blank") Stripe
    |  for payment processing.
  label Credit Card Details
  #stripe
  #stripe-error
  button(@click="purchase") Submit Payment
</template>

<script>
  let stripe = Stripe('pk_test_vSOv2tJVVsBEI6PZJLJBNiOW')
  let elements = stripe.elements()
  let style = { base: { fontSize: "18px" } }
  let card = elements.create('card', {style})

  export default {
    props: ['socialMediaTypes', 'socialMedium', 'index'],
    mounted() {
      card.mount("#stripe")
    },
    methods: {
      purchase() {
        stripe
          .createToken(card)
          .then(result=> {
            console.log("DONE")
            console.log(result)
          })
          .catch(error=> {
            console.error("No bueno for purchase")
            console.error(error)
          })
      }
    }
  }
  
</script>
