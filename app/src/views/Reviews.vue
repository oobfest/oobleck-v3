<template lang="pug">
div
  h2 Reviews
  .table-box
    table
      thead
        tr
          th Act
          th Scores
      tbody
        tr(v-for="actName in actNames") 
          td {{ actName }}
          td {{ groupedScores[actName].join(', ') }}


</template>

<script>
  export default {
    data: function() {
      return {
        reviews: [],
      }
    },
    computed: {
      actNames() {
        return Object.keys(this.groupedReviews).sort()
      },
      groupedScores() {
        return this.reviews.reduce((accumulation, review)=> {
          accumulation[review.actName]
            ? accumulation[review.actName].push(review.score)
            : accumulation[review.actName] = [review.score]
          return accumulation
        }, {})
      }
    },
    created() {
      this.$http('private/reviews')
        .then(data=> this.reviews = data)
        .catch(error=> alert(error))
    }
  }
</script>
