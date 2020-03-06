<template lang="pug">
div
  h2 Reviews
  p Todo: re-organize!
  ul
    li(v-for="review in reviews") 
      strong {{review.actName}} - 
      code {{review.score}} 
      |  by  
      em {{review.userName}}


</template>

<script>
  export default {
    data: function() {
      return {
        reviews: [],
      }
    },
    methods: {
    },
    created() {
      this.$http('private/reviews')
        .then(data=> this.reviews = data)
        .catch(error=> alert(error))
    }
  }
</script>
