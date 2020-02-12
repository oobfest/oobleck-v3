<template lang="pug">
div
  h2 Reviews
  ul
    li(v-for="review in reviews"): pre {{review}} 

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
