<template lang="pug">
  .text-align-center
    h2 What is 
      em Out of Bounds
      | ?
    p
      em Out of Bounds
      |  is a cool festival.
    div(style="background-color: white")
      #card-element
</template>

<script>
let stripe = Stripe('pk_test_vSOv2tJVVsBEI6PZJLJBNiOW', { locale: 'en'})
let elements = stripe.elements({fonts: [{family:'', src:''}]})
let style = { base: {} }
let card = elements.create('card', {style})

export default {
  methods: {
    submitPayment() {
      stripe
        .createToken(card)
        .then(response=> {
          let { token, error} = response
          if(error) alert("Error")
          else console.log(token)
        })
    }
  },
  mounted() {
   card.mount("#card-element")
  }
}
</script>
