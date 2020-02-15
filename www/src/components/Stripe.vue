<template lang="pug">
div
  h4 Application Fee
  p Your application fee is 
    code {{cost}}
    | .
  p We use 
    a(href="https://stripe.com/" target="_blank") Stripe
    |  for payment processing. 

  //- PENDING
  div(v-show="paymentStatus=='pending'")
    label Credit Card Details
    #stripe
    button(@click="purchase") Submit Payment

  //- SUBMITTED
  div(v-show="paymentStatus=='submitted'")
    p Payment is being processed...

  //- CONFIRMED
  div(v-show="paymentStatus=='confirmed'")
    p Payment confirmed!
    p A confirmation email has been sent to 
      code {{contactInfo.email}}
      | .

  #stripe-error
</template>

<script>

  // TODO
  // Handle *all* the errors!

  let stripe = Stripe(process.env.VUE_APP_STRIPE_KEY)
  let elements = stripe.elements()
  let style = { base: { fontSize: "18px" } }
  let card = elements.create('card', {style})

  export default {
    props: ['clientInfo', 'cost', 'contactInfo'],
    data() {
      return {
        paymentStatus: 'pending'
      }
    },
    mounted() {
      card.mount("#stripe")
    },
    methods: {
      purchase() {
        this.paymentStatus = 'submitted'
        stripe
          .confirmCardPayment(this.clientInfo, { 
            payment_method: { 
              card, 
              metadata: { 'hello': 'world', 'cool': 'dank' },
              billing_details: { 
                name: this.contactInfo.name,
                email: this.contactInfo.email,
                phone: this.contactInfo.phone
              } 
            },
            receipt_email: this.contactInfo.email 
          })
          .then(response=> {
            if(response.error) {
              alert("Error :(")
              console.log(response.error)
            }
            else {
              if(response.paymentIntent.status == 'succeeded') {
                this.$emit('payment-succeeded', response.paymentIntent.id)
                this.paymentStatus = 'confirmed'
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
