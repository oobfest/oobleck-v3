<template lang="pug">
div

  //- PENDING
  div(v-show="paymentStatus=='pending'")
    p Your application fee is 
      code {{cost}}
      | .
      | Payments are handled by 
      a(href="https://stripe.com/" target="_blank") Stripe
      | . 
    label Credit Card Details
    #stripe
    p.error(v-if="error") Card error: {{error}}
    button(@click="purchase") Submit Payment

  //- SUBMITTED
  div(v-show="paymentStatus=='submitted'")
    p Your payment is being processed...

  //- CONFIRMED
  div(v-show="paymentStatus=='confirmed'")
    p Your payment was successful! 
    p Your application is complete! ✅ A confirmation email has been sent to 
      code {{contactInfo.email}}
      | .

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
        error: null,
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
              metadata: { hello: 'world'},
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
              this.paymentStatus = 'pending'
              this.error = response.error.message
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
